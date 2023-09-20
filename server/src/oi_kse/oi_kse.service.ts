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

  private async reportsByType(reports, typeString) {
    let data;
    const client_host = process.env.CLIENT_HOST;
    if (reports?.length == 0) {
      return [];
    }
    if (typeString == 'oi') {
      data = reports.map(({ content, typeId, type, id, confirmDate }) => {
        const { period, year } = content;
        const url = `${client_host}/report/${typeId}/${type.tempId}/${id}`;
        return {
          content: { period, year, label: type.title, url },
          confirmDate,
          group: type.groupId,
        };
      });
    }
    if (typeString == 'listing') {
      data = reports.map(({ content, typeId, type, id, confirmDate }) => {
        const contentData = {};
        for (const key in content) {
          if (Array.isArray(content[key])) {
            let { label, url } = content[key][0];
            contentData[key] = { label, url };
          } else if (typeof content[key] == 'object') {
            let url = `${client_host}/report/${key}/${typeId}/${type.tempId}/${id}`;
            contentData[key] = { label: key, url };
          } else {
            contentData[key] = content[key];
          }
        }
        return {
          content: contentData,
          confirmDate,
          group: type.groupId,
        };
      });
    }
    return data;
  }
}
