import { FilesService } from './../files/files.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ReportTypes } from './entities/report-types.entity';
import { ReportTemplates } from './entities/report-templates.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './entities/report.entity';
import { ReportStatus } from './entities/report-status.entity';
import { User } from 'src/users/entities/user.entity';
import { Company } from 'src/companies/entities/company.entity';

import { Op, Sequelize } from 'sequelize';
import { ReportGroups } from './entities/report-groups.entity';
import { UpdateReportDto } from './dto/update-report.dto';
import { Eds } from 'src/eds/entities/ed.entity';
import sequelize from 'sequelize';
import { Receipt } from 'src/receipts/entities/receipt.entity';

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
    @InjectModel(Eds)
    private edsRepository: typeof Eds,
    @InjectModel(Receipt) private receiptRepository: typeof Receipt,

    private filesService: FilesService,
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

  // get old company reports from old oi system
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

  async updateReport(updateReportDto: UpdateReportDto, file: any) {
    try {
      const { content, reportId } = updateReportDto;
      const report = await this.reportRepository.findByPk(reportId);
      if (!report) {
        throw new HttpException('Документ не найден', HttpStatus.NOT_FOUND);
      }
      let parseContent = report.content;
      let newContent;
      if (file) {
        const { name, mimetype } = await this.filesService.createFile(file);
        const { field, label } = JSON.parse(content);
        newContent = this.mergeObjects(parseContent, {
          [field]: [
            {
              name,
              label,
              url: `${process.env.SERVER_HOST}/reports/static/${name}`,
              mimetype,
            },
          ],
        });
      } else {
        newContent = this.mergeObjects(parseContent, content);
      }

      report.content = newContent;
      report.save();
      return report;
    } catch (error) {
      console.log(error);
    }
  }

  async uploadReportFile(file: any) {
    const name = this.filesService.createFile(file);
    return name;
  }

  async removeReportFile(path: { name: string }) {
    return this.filesService.removeFile(path);
  }

  async sendReport({ id }) {
    await this.updateReportStatus(id, 2);
  }

  async getReportById(id: number) {
    const report = await this.reportRepository.findOne({
      where: { id },
      include: [
        {
          model: this.edsRepository,
          attributes: ['cert', 'typeId'],
        },
        {
          model: this.companyRepository,
          attributes: ['name'],
        },
        {
          model: this.reportTypesRepository,
          attributes: ['title'],
        },
      ],
    });
    return report;
  }

  async getReports({ roles, userId }, { limit, page }) {
    // const { title } = roles[0];
    const isAdmin = roles.some((role) =>
      ['ADMIN', 'MODERATOR'].includes(role.title),
    );
    const allowedReportStatusIds = [2, 3, 4];
    const offset = (page - 1) * limit;
    const reports = await this.reportRepository.findAndCountAll({
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
        {
          model: this.edsRepository,
          attributes: ['cert', 'typeId'],
        },
        {
          model: this.receiptRepository,
          attributes: ['id'],
        },
      ],
      attributes: {
        exclude: ['content', 'createdAt'],
        include: [
          [sequelize.fn('DATE', sequelize.col('sendDate')), 'sendDate'],
          [sequelize.fn('DATE', sequelize.col('confirmDate')), 'confirmDate'],
        ],
      },
      where: isAdmin ? { statusId: allowedReportStatusIds } : { userId },
      limit,
      offset,
      order: [['updatedAt', 'DESC']],
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

  async getReportTypeById(id: number) {
    const type = await this.reportTypesRepository.findByPk(id);
    return type;
  }

  async getReportTemplate(tid: number) {
    const template = await this.reportTemplatesRepository.findByPk(tid);
    return template;
  }

  async updateReportStatus(reportId, status) {
    const report = await this.reportRepository.findByPk(reportId);
    if (status == 2) {
      report.sendDate = new Date();
    }
    if (status == 4) {
      report.confirmDate = new Date();
    }
    if (status == 3) {
      await this.edsRepository.destroy({ where: { reportId } });
    }
    report.statusId = status;
    return await report.save();
  }

  async removeReport({ reportId }) {
    const report = await this.reportRepository.findByPk(reportId);
    // if report type listing need delete content files
    if (report.typeId === 2) {
      const content = report.content;
      for (let field in content) {
        if (Array.isArray(content[field]) && content[field].length > 0) {
          console.log('content', content[field]);
          await this.filesService.removeFile(content[field][0]);
        }
      }
    }
    await this.reportRepository.destroy({
      where: {
        id: reportId,
      },
    });
  }

  async getOiKseReports({ oi_company_id, type }) {
    const conditions =
      type == 'listing'
        ? {
            [Op.eq]: 2,
          }
        : {
            [Op.ne]: 2,
          };
    const reports = await this.reportRepository.findAll({
      where: {
        companyId: oi_company_id,
        statusId: 4,
        typeId: conditions,
      },
      include: [
        {
          model: this.reportTypesRepository,
        },
      ],
      attributes: [
        'content',
        'id',
        'typeId',
        [sequelize.fn('DATE', sequelize.col('confirmDate')), 'confirmDate'],
      ],
    });
    return reports;
  }
}
