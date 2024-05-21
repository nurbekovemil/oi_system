import { BotService } from './../bot/bot.service';
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
import { group } from 'console';
import { RoleAllowedReports } from 'src/roles/entities/role-allowed-reports.entity';

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
    @InjectModel(RoleAllowedReports)
    private roleAllowedReportsRepository: typeof RoleAllowedReports,

    private filesService: FilesService,
    private botService: BotService,
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
  async getOldReports({userId, roles}) {
    // const queryString = `
    // SELECT 
    // tbldocuments.id, 
    // CASE
    // WHEN tbldocuments.typedoc = 'Создать отчет' THEN concat('Листинговый отчет', ' ', tbldocuments.kvartal) else tbldocuments.typedoc
    // END,
    // case
    // when tbldocuments.typedoc = 'Создать отчет' then 1
    // when tbldocuments.typedoc = 'Квартальный отчет (Приложение 2-1)' or tbldocuments.typedoc = 'Годовой отчет (Приложение 2-1)' then 2
    // else 3
    // end type,
    // date(tbldocuments.datesend) as datesend, 
    // date(tbldocuments.confirmdate) as confirmdate, 
    // tbldocuments.linkkse, 
    // tbldocuments.kvartal, 
    // tbldocuments.ref,
    // (SELECT name FROM tblcompany WHERE kod = tbldocuments.sender) AS company_name
    // FROM tbldocuments, users, tblcompany
    // WHERE users.idcompany = tblcompany.id AND (tbldocuments.sender = tblcompany.kod OR
    // tbldocuments.reciver = tblcompany.kod OR (tblcompany.kod = 'fin' AND tbldocuments.status = 3))
    // AND users.id = ${userId}  AND tbldocuments.docslayoutid!=28 and tbldocuments.typedoc <> 'Существенный факт (Договор о раскрытии информации)'
    // ORDER BY datesend DESC,createdate DESC
    // `;
    const isAdmin = roles.some((role) =>
      ['ADMIN','MODERATOR'].includes(role.title),
    );
    console.log(roles)

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
    CASE
    WHEN tbldocuments.typedoc = 'Создать отчет' THEN tbldocuments.doc else null
    END AS doc,
    (SELECT name FROM tblcompany WHERE kod = tbldocuments.sender) AS company_name
    FROM tbldocuments, users, tblcompany
	  WHERE users.idcompany = tblcompany.id AND (tbldocuments.sender = tblcompany.kod OR tbldocuments.reciver = tblcompany.kod)
    ${isAdmin ? ``: `AND users.id = ${userId}`}
    AND tbldocuments.docslayoutid!=28 and tbldocuments.typedoc <> 'Существенный факт (Договор о раскрытии информации)' and tbldocuments.status = 3
    ORDER BY datesend DESC,createdate DESC
    `
    console.log('queryString', queryString)
    const [result] = await this.oi_old.query(queryString);
    return result;
  }

  async createReport(createReportDto: CreateReportDto, roles) {
    const isAdmin = roles.some((role) =>
      ['ADMIN', 'MODERATOR'].includes(role.title),
    );
    if(isAdmin){
      const report = await this.reportRepository.create(createReportDto);
      report.statusId = 2
      report.save()
      return report.id;
    }else {
      const report = await this.reportRepository.create(createReportDto);
      return report.id;
    }
  }

  async updateReportCompanyId({reportId, companyId}) {
    const report = await this.reportRepository.findByPk(reportId)
    report.companyId = companyId
    report.save()
    return report.id
  }

  mergeObjects(obj1, obj2) {
    let mergedObj = { ...obj1 };
    for (const key in obj2) {
      if (obj2[key] == 'deleted') {
        delete mergedObj[key];
        continue;
      }
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
              url: `${process.env.SERVER_FILE_URL}/reports/static/${name}`,
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
          attributes: ['title', 'tempId', 'groupId'],
        },
      ],
    });
    return report;
  }

  async getReports({ roles, userId, companyId }, { limit, page }) {
    const { id } = roles[0];
    const isAdmin = roles.some((role) =>
      ['ADMIN', 'MODERATOR'].includes(role.title),
    );
    console.log('companyId ------ ', companyId)
    const { report_types, report_status } =
      await this.roleAllowedReportsRepository.findOne({
        where: { roleId: id },
      });
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
          [
            sequelize.fn('TO_CHAR', sequelize.col('send_date'), 'DD-MM-YYYY'),
            'send_date',
          ],
          [
            sequelize.fn(
              'TO_CHAR',
              sequelize.col('confirm_date'),
              'DD-MM-YYYY',
            ),
            'confirm_date',
          ],
        ],
      },
      where: isAdmin
        ? { statusId: report_status, typeId: report_types }
        : { companyId },
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

  async getReportsByGroupType({ type, reportId }, { userId }) {
    const reports = await this.reportRepository.findAll({
      where: {
        typeId: type,
        id: {
          [Op.ne]: reportId,
        },
        userId,
      },
      attributes: [
        [
          sequelize.fn('TO_CHAR', sequelize.col('confirm_date'), 'DD-MM-YYYY'),
          'confirm_date',
        ],
        'content',
        'id',
      ],
      include: [
        {
          model: this.reportTypesRepository,
        },
      ],
      order: [['send_date', 'DESC']],
    });
    return reports;
  }

  async getReportTypeById(id: number) {
    const type = await this.reportTypesRepository.findByPk(id);
    return type;
  }

  async getReportTemplate(tid: number) {
    const template = await this.reportTemplatesRepository.findByPk(tid);
    return template;
  }

  checkFinancialStatements(data) {
    let count = 0;
    for (const key in data) {
      if (key.startsWith('financial_statement') && data[key] != "") {
        count++
      }
    }
    return count >= 68;
  }

  async updateReportStatus(reportId, status) {
    try {
      const report = await this.getReportById(reportId);
      if(status == 2 && report.typeId == 1 && !this.checkFinancialStatements(report.content)) {
        // throw new HttpException('Пункт финансовая отчетность эмитента не все поля заполнены', HttpStatus.BAD_REQUEST);
        throw new Error('Приложение 2-1 пункт финансовая отчетность эмитента не все поля заполнены');
      }
      if (status == 2) {
        report.send_date = new Date();
        this.botService.sendNoticeForAdmin(report);
      }
      if (status == 4) {
        report.confirm_date = new Date();
      }
      if (status == 4 && report.type.groupId == 2) {
        report.confirm_date = new Date();
        this.botService.sendNoticeForKseNewsChannel(report);
      }
      if (status == 3) {
        report.send_date = null;
        await this.edsRepository.destroy({ where: { reportId } });
      }
      report.statusId = status;
      return await report.save();
    } catch (error) {
      throw new HttpException(
        error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
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
            companyId: oi_company_id,
            statusId: 4,
            typeId: 2,
          }
        : {
            companyId: oi_company_id,
            statusId: 4,
          };

    const reports = await this.reportRepository.findAll({
      where: conditions,
      include: [
        {
          model: this.reportTypesRepository,
        },
        {
          model: this.companyRepository,
        },
      ],
      attributes: [
        'content',
        'id',
        'typeId',
        [
          sequelize.fn('TO_CHAR', sequelize.col('confirm_date'), 'DD.MM.YYYY'),
          'confirm_date',
        ],
      ],
    });
    return reports;
  }
  async getOiKseLastNews() {
    const reports = await this.reportRepository.findAll({
      where: {
        statusId: 4,
      },
      include: [
        {
          model: this.reportTypesRepository,
          where: {
            groupId: 2,
          },
          attributes: ['tempId', 'title'],
        },
        {
          model: this.companyRepository,
          attributes: ['name'],
        },
      ],
      attributes: [
        'id',
        'typeId',
        'confirm_date',
        // [
        //   sequelize.fn(
        //     'TO_CHAR',
        //     sequelize.col('confirm_date'),
        //     'DD-MM-YYYY HH24:MI:SS',
        //   ),
        //   'confirm_date',
        // ],
      ],
      order: [['confirm_date', 'desc']],
      limit: 3,
    });
    return reports;
  }
  async getOiKseAllNews({ page, limit }) {
    const offset = (page - 1) * limit;
    const reports = await this.reportRepository.findAll({
      where: {
        statusId: 4,
      },
      include: [
        {
          model: this.reportTypesRepository,
          where: {
            groupId: 2,
          },
          attributes: ['tempId', 'title'],
        },
        {
          model: this.companyRepository,
          attributes: ['name'],
        },
      ],
      attributes: [
        'id',
        'typeId',
        'confirm_date',
        'content',
        // [
        //   sequelize.fn(
        //     'TO_CHAR',
        //     sequelize.col('confirm_date'),
        //     'DD-MM-YYYY HH24:MI:SS',
        //   ),
        //   'confirm_date',
        // ],
      ],
      order: [['confirm_date', 'desc']],
      offset,
      limit,
    });
    return reports;
  }
  async getOiKseListingProspectReports(){
  const reports = await this.reportRepository.findAll({
    where: {
      statusId: 4,
      typeId: 2,
    },
    attributes: [
      'companyId',
      'id',
      [
        sequelize.fn('TO_CHAR', sequelize.col('confirm_date'), 'DD.MM.YYYY'),
        'confirm_date',
      ],
      [sequelize.literal(`content->'prospect'`), 'prospect'],
    ],
  });
  return reports;
  }
}
