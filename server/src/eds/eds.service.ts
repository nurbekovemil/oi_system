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
      throw new HttpException(error.response.data, HttpStatus.BAD_REQUEST);
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
      const cert = await this.getEdsCertificate(token);
      const hashDocument = Buffer.from(JSON.stringify(content)).toString(
        'base64',
      );
      const signedDocument = await this.signEdsDocument(hashDocument, token);

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
      console.log(error);
      throw new HttpException(error.response, HttpStatus.BAD_REQUEST);
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
      throw new HttpException(error.response.data, HttpStatus.BAD_REQUEST);
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
      throw new HttpException(error.response.data, HttpStatus.BAD_REQUEST);
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
      return response.data;
    } catch (error) {
      throw new HttpException(error.response.data, HttpStatus.BAD_REQUEST);
    }
  }
}
