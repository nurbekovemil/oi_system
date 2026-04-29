import { ReceiptsService } from './../receipts/receipts.service';
import { ReportsService } from './../reports/reports.service';
import { CompaniesService } from './../companies/companies.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { UsersService } from 'src/users/users.service';
import { InjectModel } from '@nestjs/sequelize';
import { Eds } from './entities/ed.entity';
@Injectable()
export class EdsService {
  private readonly edsAccessToken = process.env.EDS_ACCESS_TOKEN;
  constructor(
    @InjectModel(Eds) private edsRepository: typeof Eds,
    private UsersService: UsersService,
    private CompaniesService: CompaniesService,
    private ReportsService: ReportsService,
    private ReceiptsService: ReceiptsService,
  ) {}

  async sendPinCodeEmail({ userId, companyId }) {
    try {
      const url = 'https://cdsapi.srs.kg/api/get-pin-code';
      const { personIdnp, organizationInn } = await this.getInns(
        userId,
        companyId,
      );
      if (!personIdnp || !organizationInn) {
        throw new HttpException(
          'Заполните ИНН пользователя или организации',
          HttpStatus.BAD_REQUEST,
        );
      }

      const response = await axios.post(
        url,
        {
          personIdnp,
          organizationInn,
          method: 'email',
        },
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: `Bearer ${this.edsAccessToken}`,
          },
        },
      );
      return response.data;
    } catch (error) {
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
      const { token } = await this.getEdsAccessToken(
        personIdnp,
        organizationInn,
        pin,
      );
      console.log('token', token);
      const cert = await this.getEdsCertificate(token);
      const normalized = JSON.stringify(content ?? {});
      console.log('normalized', normalized);
      const sanitized = normalized.replace(
        /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,
        '',
      );
      // const hashDocument = Buffer.from(JSON.stringify(content)).toString('base64');
      const hashDocument = Buffer.from(sanitized, 'utf8').toString('base64');
      console.log('hashDocument', hashDocument);
      const signedDocument = await this.signEdsDocument(hashDocument, token);
      console.log('signedDocument', signedDocument);
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
    return await roles.some((role) =>
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
  private async getEdsAccessToken(personIdnp, organizationInn, pin) {
    try {
      const url = 'https://cdsapi.srs.kg/api/account/auth';
      const response = await axios.post(
        url,
        {
          personIdnp,
          organizationInn,
          byPin: pin,
        },
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: `Bearer ${this.edsAccessToken}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      this.throwCdsError(error);
    }
  }
  private async getEdsCertificate(userToken) {
    try {
      const url = 'https://cdsapi.srs.kg/api/get-cert-info';
      const response = await axios.post(
        url,
        {
          userToken,
        },
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: `Bearer ${this.edsAccessToken}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      this.throwCdsError(error);
    }
  }
  private async signEdsDocument(hash, userToken) {
    try {
      const url = 'https://cdsapi.srs.kg/api/get-sign/for-hash';
      const response = await axios.post(
        url,
        {
          hash,
          userToken,
        },
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: `Bearer ${this.edsAccessToken}`,
          },
        },
      );
      return response?.data;
    } catch (error) {
      this.throwCdsError(error);
    }
  }

  private throwCdsError(error: any): never {
    if (!axios.isAxiosError(error)) {
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

    const status = error.response?.status;
    const data = error.response?.data;

    if (typeof data === 'string') {
      const isHtml = data.trim().startsWith('<');
      if (isHtml) {
        throw new HttpException(
          {
            message: 'Внешний EDS сервис вернул HTML вместо JSON',
            upstreamStatus: status ?? 500,
          },
          HttpStatus.BAD_GATEWAY,
        );
      }
      throw new HttpException(
        { message: data, upstreamStatus: status ?? 500 },
        HttpStatus.BAD_GATEWAY,
      );
    }

    if (!error.response) {
      throw new HttpException(
        {
          message: error.message ?? 'Нет ответа от внешнего EDS сервиса',
          code: error.code,
          rawError: error.toJSON?.() ?? error,
        },
        HttpStatus.GATEWAY_TIMEOUT,
      );
    }

    throw new HttpException(
      { message: data ?? 'Ошибка внешнего EDS сервиса', upstreamStatus: status },
      HttpStatus.BAD_GATEWAY,
    );
  }
}
