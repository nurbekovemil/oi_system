import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { Op } from 'sequelize';
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
  ) {}
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
}
