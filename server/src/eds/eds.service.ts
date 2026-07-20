import { ReceiptsService } from './../receipts/receipts.service';
import { ReportsService } from './../reports/reports.service';
import { CompaniesService } from './../companies/companies.service';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { UsersService } from 'src/users/users.service';
import { InjectModel } from '@nestjs/sequelize';
import { Eds } from './entities/ed.entity';
import { createHash } from 'crypto';

@Injectable()
export class EdsService {
  private readonly logger = new Logger(EdsService.name);
  private readonly edsAccessToken = process.env.EDS_ACCESS_TOKEN;
  private readonly cdsApiUrl = 'https://cdsapi.srs.kg/api/oep';

  constructor(
    @InjectModel(Eds) private edsRepository: typeof Eds,
    private UsersService: UsersService,
    private CompaniesService: CompaniesService,
    private ReportsService: ReportsService,
    private ReceiptsService: ReceiptsService,
  ) {}

  async sendPinCodeEmail({ userId, companyId }) {
    try {
      const { personIdnp, organizationInn } = await this.getInns(
        userId,
        companyId,
      );
      this.logger.log(
        `[pin/send] userId=${userId} companyId=${companyId} personIdnp=${personIdnp} organizationInn=${organizationInn}`,
      );
      if (!personIdnp || !organizationInn) {
        throw new HttpException(
          'Заполните ИНН пользователя или организации',
          HttpStatus.BAD_REQUEST,
        );
      }
      const path = '/pin-code';
      const url = `${this.cdsApiUrl}${path}`;
      const body = {
        personIdnp,
        organizationInn,
        method: 'email',
      };
      this.logger.log(`[pin/send] CDS request POST ${url}`);
      this.logger.log(`[pin/send] CDS body ${JSON.stringify(body)}`);
      this.logger.log(
        `[pin/send] token present=${Boolean(this.edsAccessToken)} tokenLength=${this.edsAccessToken?.length ?? 0}`,
      );
      const result = await this.cdsPost(path, body);
      this.logger.log(
        `[pin/send] CDS success ${JSON.stringify(result)}`,
      );
      return result;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        this.logger.error(
          `[pin/send] CDS error status=${error.response?.status} data=${JSON.stringify(error.response?.data)} message=${error.message}`,
        );
      } else {
        this.logger.error(
          `[pin/send] error ${error?.message ?? error}`,
        );
      }
      this.throwCdsError(error);
    }
  }

  async confirmPinCode({ userId, companyId, roles }, { pin, reportId }) {
    try {
      const { content } = await this.ReportsService.getReportById(reportId);
      const { personIdnp, organizationInn } = await this.getInns(
        userId,
        companyId,
      );
      // JSON → base64 → SHA256 → подпись хеша (по инструкции CDS)
      const normalized = JSON.stringify(content ?? {});
      const base64Document = Buffer.from(normalized, 'utf8').toString('base64');
      const hashDocument = createHash('sha256')
        .update(base64Document, 'utf8')
        .digest('hex');
      const { cert, signedDocument } = await this.authAndSignHash(
        hashDocument,
        personIdnp,
        organizationInn,
        pin,
      );
      if (await this.isAdmin(roles)) {
        return this.ReceiptsService.createReceipt({
          reportId,
          cert,
          hash: signedDocument,
          userId,
        });
      } else {
        return this.signReport(
          1,
          reportId,
          cert,
          signedDocument,
          userId,
          companyId,
        );
      }
    } catch (error) {
      this.throwCdsError(error);
    }
  }

  async signRutoken({ userId, companyId, roles }, { hash, reportId, cert }) {
    if (await this.isAdmin(roles)) {
      return this.ReceiptsService.createReceipt({
        reportId,
        cert,
        hash,
        userId,
      });
    }
    return await this.signReport(2, reportId, cert, hash, userId, companyId);
  }

  private async isAdmin(roles) {
    return roles.some((role) =>
      ['ADMIN', 'MODERATOR'].includes(role.title),
    );
  }

  private async signReport(typeId, reportId, cert, hash, userId, companyId) {
    const eds = await this.edsRepository.create({
      typeId,
      reportId,
      cert,
      hash,
      userId,
      companyId,
    });
    await this.ReportsService.updateReportStatus(reportId, 5);
    return eds;
  }

  private async getInns(userId, companyId) {
    const { inn: personIdnp } = await this.UsersService.findUserByPk(userId);
    const { inn: organizationInn } = await this.CompaniesService.findOne(
      companyId,
    );
    return { personIdnp, organizationInn };
  }

  private async authAndSignHash(hash, personIdnp, organizationInn, pin) {
    const { token } = await this.cdsPost('/account/auth', {
      personIdnp,
      organizationInn,
      byPin: pin,
    });
    const cert = await this.cdsPost('/cert-info', { userToken: token });
    const signedDocument = await this.cdsPost('/sign/hash', {
      hash,
      userToken: token,
    });
    return { cert, signedDocument };
  }

  private async cdsPost(path: string, body: Record<string, unknown>) {
    try {
      const response = await axios.post(`${this.cdsApiUrl}${path}`, body, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: `Bearer ${this.edsAccessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        (error as any).cdsPath = path;
        (error as any).cdsBodyKeys = Object.keys(body || {});
      }
      throw error;
    }
  }

  private throwCdsError(error: any): never {
    if (!axios.isAxiosError(error)) {
      if (error instanceof HttpException) {
        throw error;
      }
      const fallbackMessage =
        error?.message ??
        (typeof error === 'string' ? error : 'Неизвестная ошибка EDS сервиса');
      throw new HttpException(
        {
          message: fallbackMessage,
          rawError: error,
        },
        HttpStatus.BAD_GATEWAY,
      );
    }

    const cdsPath = (error as any).cdsPath as string | undefined;
    const status = error.response?.status;
    const data = error.response?.data;
    const message = this.extractCdsMessage(data);

    if (typeof data === 'string') {
      const isHtml = data.trim().startsWith('<');
      if (isHtml) {
        const plain = data.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        const htmlMessage = /503/i.test(plain)
          ? 'Внешний EDS сервис временно недоступен (503)'
          : /502/i.test(plain)
            ? 'Ошибка шлюза внешнего EDS сервиса (502)'
            : plain || 'Внешний EDS сервис вернул HTML вместо JSON';
        throw new HttpException(
          {
            message: htmlMessage,
            upstreamStatus: status ?? 500,
            cdsPath,
          },
          HttpStatus.BAD_GATEWAY,
        );
      }
      throw new HttpException(
        { message: data, upstreamStatus: status ?? 500, cdsPath },
        HttpStatus.BAD_GATEWAY,
      );
    }

    if (!error.response) {
      throw new HttpException(
        {
          message: error.message ?? 'Нет ответа от внешнего EDS сервиса',
          code: error.code,
          cdsPath,
          rawError: error.toJSON?.() ?? error,
        },
        HttpStatus.GATEWAY_TIMEOUT,
      );
    }

    throw new HttpException(
      {
        message,
        upstreamStatus: status,
        cdsPath,
        raw: data,
      },
      HttpStatus.BAD_GATEWAY,
    );
  }

  private extractCdsMessage(data: any): string {
    if (!data) return 'Ошибка внешнего EDS сервиса';
    if (typeof data === 'string') return data;
    if (typeof data.errorMessage === 'string') return data.errorMessage;
    if (typeof data.message?.errorMessage === 'string') {
      return data.message.errorMessage;
    }
    if (typeof data.message === 'string') return data.message;
    try {
      return JSON.stringify(data);
    } catch {
      return 'Ошибка внешнего EDS сервиса';
    }
  }
}
