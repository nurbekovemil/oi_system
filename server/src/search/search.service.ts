import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { Op, Sequelize } from 'sequelize';
import { Company } from 'src/companies/entities/company.entity';
import { Eds } from 'src/eds/entities/ed.entity';
import { Receipt } from 'src/receipts/entities/receipt.entity';
import { ReportStatus } from 'src/reports/entities/report-status.entity';
import { ReportTypes } from 'src/reports/entities/report-types.entity';
import { Report } from 'src/reports/entities/report.entity';
import { RoleAllowedReports } from 'src/roles/entities/role-allowed-reports.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SearchService {
  private oi_old: Sequelize;
  constructor(
    @InjectModel(Report) private reportRepository: typeof Report,
    @InjectModel(ReportTypes) private reportTypesRepository: typeof ReportTypes,
    @InjectModel(ReportStatus)
    private reportStatusRepository: typeof ReportStatus,
    @InjectModel(Eds) private edsRepository: typeof Eds,
    @InjectModel(Receipt) private receiptRepository: typeof Receipt,
    @InjectModel(RoleAllowedReports)
    private roleAllowedReportsRepository: typeof RoleAllowedReports,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Company) private companyRepository: typeof Company,
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
  async findAll({ roles, userId }, { value }) {
    const { id } = roles[0];
    const isAdmin = roles.some((role) =>
      ['ADMIN', 'MODERATOR'].includes(role.title),
    );
    let searchedData = {};
    if (isAdmin) {
      const users = await this.findAllUsers(value);
      searchedData = { ...searchedData, users };
    }
    const reports = await this.findAllReports(isAdmin, id, userId, value);
    return { ...searchedData, reports };
  }
  private async findAllReports(isAdmin, id, userId, value) {
    const { report_types, report_status } =
      await this.roleAllowedReportsRepository.findOne({
        where: { roleId: id },
      });
    let include = [];
    if (isAdmin) {
      include = [
        {
          model: this.reportTypesRepository,
        },
        {
          model: this.companyRepository,
          attributes: ['name', 'id'],
          where: {
            name: {
              [Op.iLike]: `%${value}%`,
            },
          },
        },
      ];
    } else {
      include = [
        {
          model: this.reportTypesRepository,
          where: {
            title: {
              [Op.iLike]: `%${value}%`,
            },
          },
        },
        {
          model: this.companyRepository,
          attributes: ['name', 'id'],
        },
      ];
    }
    const reports = await this.reportRepository.findAndCountAll({
      include: [
        ...include,
        {
          model: this.reportStatusRepository,
        },
        {
          model: this.userRepository,
          attributes: ['firstName', 'id'],
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
        ? {
            statusId: report_status,
            typeId: report_types,
          }
        : { userId },
      order: [['updatedAt', 'DESC']],
    });
    return reports;
  }
  private async findAllUsers(value) {
    const users = await this.userRepository.findAndCountAll({
      include: [
        {
          model: this.companyRepository,
          attributes: ['name', 'id'],
          where: {
            name: {
              [Op.iLike]: `%${value}%`,
            },
          },
        },
      ],
      attributes: ['id', 'login'],
      order: [['login', 'ASC']],
    });
    return users;
  }

  async findOldReports({ roles, userId }, { value }){
    const { id } = roles[0];
    const isAdmin = roles.some((role) =>
      ['ADMIN', 'MODERATOR'].includes(role.title),
    );
    let searchedData = []
    if(isAdmin){
      searchedData = await this.findAllOldReports(value)
    } else {
      searchedData = await this.findUserOldReports(userId, value)
    }
  }

  private async findAllOldReports(value){
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
    AND tbldocuments.docslayoutid!=28 and tbldocuments.typedoc <> 'Существенный факт (Договор о раскрытии информации)' and tbldocuments.status = 3
    ORDER BY datesend DESC,createdate DESC`

    const [result] = await this.oi_old.query(queryString);
    return result;
  }
  private async findUserOldReports(userId, value){
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
    AND users.id = ${userId}
    AND tbldocuments.docslayoutid!=28 and tbldocuments.typedoc <> 'Существенный факт (Договор о раскрытии информации)' and tbldocuments.status = 3
    ORDER BY datesend DESC,createdate DESC`
    
    const [result] = await this.oi_old.query(queryString);
    return result;
  }
}
