import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ReportTypes } from './entities/report-types.entity';
import { ReportTemplates } from './entities/report-templates.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './entities/report.entity';
import { ReportStatus } from './entities/report-status.entity';
import { User } from 'src/users/entities/user.entity';
import { Company } from 'src/companies/entities/company.entity';

import { Sequelize } from 'sequelize';
import { ReportGroups } from './entities/report-groups.entity';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportsService {
  private oi_old: Sequelize;
  constructor(
    @InjectModel(Report) private reportRepository: typeof Report,
    @InjectModel(ReportGroups)
    private reportGroupsRepository: typeof ReportGroups,
    @InjectModel(ReportTypes) private reportTypesRepository: typeof ReportTypes,
    @InjectModel(ReportStatus)
    private reportStatusRepository: typeof ReportStatus,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Company) private companyRepository: typeof Company,
    @InjectModel(ReportTemplates)
    private reportTemplatesRepository: typeof ReportTemplates,
  ) {
    this.oi_old = new Sequelize({
      dialect: 'postgres',
      host: process.env.DB_OLD_HOST,
      port: Number(process.env.DB_OLD_PORT),
      username: process.env.DB_OLD_USER,
      password: process.env.DB_OLD_PASS,
      database: process.env.DB_OLD_NAME,
    });
  }

  // get old company reports
  async getOldReports(userId: number) {
    const queryString = `
    SELECT 
    tbldocuments.id, 
    CASE
    WHEN tbldocuments.typedoc = 'Создать отчет' THEN concat('Листинговый отчет', ' ', tbldocuments.kvartal) else tbldocuments.typedoc
    END,
    case
    when tbldocuments.typedoc = 'Создать отчет' then 1
    when tbldocuments.typedoc = 'Квартальный отчет (Приложение 2-1)' or tbldocuments.typedoc = 'Годовой отчет (Приложение 2-1)' then 2
    else 3
    end type,
    date(tbldocuments.datesend) as datesend, 
    date(tbldocuments.confirmdate) as confirmdate, 
    tbldocuments.linkkse, 
    tbldocuments.kvartal, 
    tbldocuments.ref,
    (SELECT name FROM tblcompany WHERE kod = tbldocuments.sender) AS company_name
    FROM tbldocuments, users, tblcompany
    WHERE users.idcompany = tblcompany.id AND (tbldocuments.sender = tblcompany.kod OR
    tbldocuments.reciver = tblcompany.kod OR (tblcompany.kod = 'fin' AND tbldocuments.status = 3))
    AND users.id = ${userId}  AND tbldocuments.docslayoutid!=28 and tbldocuments.typedoc <> 'Существенный факт (Договор о раскрытии информации)'
    ORDER BY datesend DESC,createdate DESC
    `;
    const [result] = await this.oi_old.query(queryString);
    return result;
  }

  async createReport(createReportDto: CreateReportDto) {
    const report = await this.reportRepository.create(createReportDto);
    return report.id;
  }

  // mergeObjects(...objects) {
  //   let mergedObj = {};

  //   for (const obj of objects) {
  //     for (const key in obj) {
  //       if (Array.isArray(obj[key])) {
  //         if (!mergedObj[key]) {
  //           mergedObj[key] = [];
  //         }
  //         for (let i = 0; i < obj[key].length; i++) {
  //           if (!mergedObj[key][i]) {
  //             mergedObj[key][i] = {};
  //           }
  //           mergedObj[key][i] = this.mergeObjects(
  //             mergedObj[key][i],
  //             obj[key][i],
  //           );
  //         }
  //       } else if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
  //         if (!mergedObj[key]) {
  //           mergedObj[key] = {};
  //         }
  //         mergedObj[key] = this.mergeObjects(mergedObj[key], obj[key]);
  //       } else {
  //         mergedObj[key] = obj[key];
  //       }
  //     }
  //   }

  //   return mergedObj;
  // }

  // merge2Objects(...objects) {
  //   let mergedObj = {};

  //   for (const obj of objects) {
  //     for (const key in obj) {
  //       if (Array.isArray(obj[key])) {
  //         if (!mergedObj[key]) {
  //           mergedObj[key] = [];
  //         }
  //         if (obj[key].length === 0) {
  //           // Set the value from obj2 even if it's an empty array
  //           mergedObj[key] = obj[key];
  //         } else if (mergedObj[key].length === 0) {
  //           // Set a default value for an empty array
  //           mergedObj[key] = [{}];
  //         }
  //         for (let i = 0; i < obj[key].length; i++) {
  //           if (!mergedObj[key][i]) {
  //             mergedObj[key][i] = {};
  //           }
  //           mergedObj[key][i] = this.mergeObjects(mergedObj[key][i], obj[key][i]);
  //         }
  //       } else if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
  //         if (!mergedObj[key]) {
  //           mergedObj[key] = {};
  //         }
  //         mergedObj[key] = this.mergeObjects(mergedObj[key], obj[key]);
  //       } else {
  //         mergedObj[key] = obj[key];
  //       }
  //     }
  //   }

  //   return mergedObj;
  // }

  // mergeObjects(obj1, obj2) {
  //   let mergedObj = { ...obj1 }; // Start with a copy of obj1

  //   for (const key in obj2) {
  //     if (Array.isArray(obj2[key])) {
  //       // If obj2[key] is an array and obj1[key] is empty or undefined, use obj2[key]
  //       if (!mergedObj[key] || mergedObj[key].length === 0) {
  //         mergedObj[key] = obj2[key];
  //       } else {
  //         // Otherwise, merge the arrays element-wise
  //         mergedObj[key] = mergedObj[key].map((item, index) =>
  //           this.mergeObjects(item || {}, obj2[key][index] || {}),
  //         );
  //       }
  //     } else if (typeof obj2[key] === 'object' && !Array.isArray(obj2[key])) {
  //       // If obj2[key] is an object and obj1[key] is empty or undefined, use obj2[key]
  //       if (!mergedObj[key]) {
  //         mergedObj[key] = obj2[key];
  //       } else {
  //         // Otherwise, recursively merge the objects
  //         mergedObj[key] = this.mergeObjects(mergedObj[key], obj2[key]);
  //       }
  //     } else {
  //       // For all other cases, use obj2[key]
  //       mergedObj[key] = obj2[key];
  //     }
  //   }

  //   return mergedObj;
  // }

  mergeObjects(obj1, obj2) {
    let mergedObj = { ...obj1 };

    for (const key in obj2) {
      if (Array.isArray(obj2[key])) {
        // If obj2[key] is an array, replace obj1[key] with obj2[key]
        mergedObj[key] = obj2[key];
      } else if (typeof obj2[key] === 'object' && !Array.isArray(obj2[key])) {
        // If obj2[key] is an object, replace obj1[key] with obj2[key]
        mergedObj[key] = { ...mergedObj[key], ...obj2[key] };
      } else {
        // For all other cases, replace obj1[key] with obj2[key]
        mergedObj[key] = obj2[key];
      }
    }

    return mergedObj;
  }

  async updateReport(updateReportDto: UpdateReportDto) {
    try {
      const { content, reportId } = updateReportDto;
      const report = await this.reportRepository.findByPk(reportId);
      if (!report) {
        throw new HttpException('Документ не найден', HttpStatus.NOT_FOUND);
      }
      let parseContent = JSON.parse(report.content);
      let newContent = this.mergeObjects(parseContent, content);
      report.content = JSON.stringify(newContent);
      report.save();
      return report;
    } catch (error) {
      console.log(error);
    }
  }
  async getReportById(id: number) {
    const report = await this.reportRepository.findByPk(id);
    return report;
  }

  async getReports() {
    const reports = await this.reportRepository.findAll({
      include: [
        {
          model: this.reportTypesRepository,
        },
        {
          model: this.reportStatusRepository,
        },
        {
          model: this.userRepository,
          attributes: ['firstName', 'id'],
        },
        {
          model: this.companyRepository,
          attributes: ['name', 'id'],
        },
      ],
      attributes: {
        exclude: ['content', 'updatedAt', 'createdAt'],
      },
    });
    return reports;
  }

  async getReportTypes() {
    const types = await this.reportGroupsRepository.findAll({
      include: [
        {
          model: this.reportTypesRepository,
          attributes: ['title', 'id', 'tempId'],
        },
      ],
    });
    return types;
  }

  async getReportTemplate(tid: number) {
    const template = await this.reportTemplatesRepository.findByPk(tid);
    return template;
  }
}
