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

  async getListingPropectReports() {
    const report_list = await this.reportsService.getOiKseListingProspectReports();
    const company_list = await this.oikseRepository.findAll({
      where: {
        type: 'listing'
      }
    })
    const lastReports = {};

    let reports = JSON.parse(JSON.stringify(report_list))
    let companies = JSON.parse(JSON.stringify(company_list))

    await reports.forEach(report => {
        const companyId = report.companyId;
        if ((!lastReports[companyId] || report.confirm_date > lastReports[companyId].confirmDate) && report.prospect) {
            lastReports[companyId] = {
                kseCompanyId: companies.find(company => company.oi_company_id === companyId).kse_company_id,
                confirmDate: report.confirm_date,
                url: report.prospect[0].url
            };
        }
    });
    const result = await Object.values(lastReports);
    return result;
  }

  async getLastNews() {
    const client_host = process.env.CLIENT_HOST;
    const reports = await this.reportsService.getOiKseLastNews();
    const news = reports.map(
      ({ typeId, type, id, confirm_date: date, company }) => {
        const url = `${client_host}/report/${typeId}/${type.tempId}/${id}`;
        return {
          url,
          title: `${company.name} : ${type.title}`,
          date,
        };
      },
    );
    return news;
  }

  async getAllNews({ page, limit }) {
    const client_host = process.env.CLIENT_HOST;
    const reports = await this.reportsService.getOiKseAllNews({
      page,
      limit,
    });
    const news = reports.map(
      ({ typeId, type, id, confirm_date: date, company, content }) => {
        const url = `${client_host}/report/${typeId}/${type.tempId}/${id}`;
        let description = content ? Object.values(content).join(', ') : '';
        return {
          url,
          title: `${company.name} : ${type.title}`,
          description,
          date,
        };
      },
    );
    return news;
  }

  private async reportsByType(reports, typeString) {
    let data;
    const client_host = process.env.CLIENT_HOST;
    if (reports?.length == 0) {
      return [];
    }
    if (typeString == 'oi') {
      data = reports.map(
        ({ content, typeId, type, id, confirm_date, company }) => {
          // typeId == 2 - Листинговый отчет
          if (typeId == 2) {
            const { listing_period, listing_year } = content;
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
              confirm_date,
              period: listing_period,
              year: listing_year,
              group: type.groupId,
            };
          } else {
            const url = `${client_host}/report/${typeId}/${type.tempId}/${id}`;
            const { period, year } = content;
            return {
              content: { label: `${company.name} : ${type.title}`, url },
              confirm_date,
              period,
              year,
              group: type.groupId,
            };
          }
        },
      );
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
      data = reports.map(
        ({ content, typeId, type, id, confirm_date, company }) => {
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
            confirm_date,
            period: content.listing_period,
            year: content.listing_year,
            group: type.groupId,
          };
        },
      );
    }
    let list = data.filter(({ content }) => Object.keys(content).length) 
      return list.sort((a, b) => {
        const dateA: any = new Date(a.confirm_date.split('.').reverse().join('-'));
        const dateB: any = new Date(b.confirm_date.split('.').reverse().join('-'));
        return dateB - dateA;
    });
  }

  
}
