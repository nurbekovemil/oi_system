import { ReportsService } from './../reports/reports.service';
import { InjectModel } from '@nestjs/sequelize';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OiKse } from './entities/oi_kse.entity';
import { Report } from 'src/reports/entities/report.entity';
import sequelize from 'sequelize';

@Injectable()
export class OiKseService {
  constructor(
    @InjectModel(OiKse) private oikseRepository: typeof OiKse,
    private reportsService: ReportsService,
  ) {}
  async getReportsByCompanyId({ kse_company_id, type }) {
    const company = await this.oikseRepository.findOne({
      where: {
        kse_company_id,
        type,
      },
    });
    console.log('company', JSON.stringify(company));
    if (!company) {
      throw new HttpException('Компания не найдено!', HttpStatus.BAD_REQUEST);
    }

    const reports = await this.reportsService.getOiKseReports({
      oi_company_id: company.oi_company_id,
      type,
    });
    const data = await this.reportsByType(reports, type);
    return data;
  }

  private async reportsByType(reports, typeString) {
    let data;
    const client_host = process.env.CLIENT_HOST;
    if (reports?.length == 0) {
      return [];
    }
    if (typeString == 'oi') {
      data = reports.map(({ content, typeId, type, id, confirmDate }) => {
        const { period, year } = content;
        // typeId == 2 - Листинговый отчет
        if (typeId == 2) {
          let contentData = {};
          for (const key in content) {
            // attachment_2_1 - Листинг отчет Приложение 2-1
            if (key == 'attachment_2_1') {
              if (typeof content[key] == 'object') {
                let url = `${client_host}/report/${key}/${typeId}/${type.tempId}/${id}`;
                contentData = { label: 'Приложение 2-1', url };
              }
            }
          }
          return {
            content: contentData,
            confirmDate,
            period,
            year,
            group: type.groupId,
          };
        } else {
          const url = `${client_host}/report/${typeId}/${type.tempId}/${id}`;
          return {
            content: { label: type.title, url },
            confirmDate,
            period,
            year,
            group: type.groupId,
          };
        }
      });
    }
    if (typeString == 'listing') {
      // accessibleFields - Доступные поля листинг отчета
      const accessibleFields = [
        'balance',
        'prospect',
        'fin_rep',
        'cash_flow',
        'cap_rep',
        'analytics',
        'corporate',
        'auditreport',
        'emission',
      ];
      data = reports.map(({ content, typeId, type, id, confirmDate }) => {
        const contentData = {};
        for (const key in content) {
          if (accessibleFields.includes(key)) {
            if (Array.isArray(content[key]) && content[key].length > 0) {
              let { label, url } = content[key][0];
              contentData[key] = { label, url };
            } else if (typeof content[key] == 'object') {
              let url = `${client_host}/report/${key}/${typeId}/${type.tempId}/${id}`;
              contentData[key] = { label: key, url };
            }
          }
        }

        return {
          content: contentData,
          confirmDate,
          period: content.listing_period,
          year: content.listing_year,
          group: type.groupId,
        };
      });
    }
    return data.filter(({ content }) => Object.keys(content).length);
  }
}
