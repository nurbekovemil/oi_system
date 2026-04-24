import { UsersService } from './../users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Company } from './entities/company.entity';
import { User } from 'src/users/entities/user.entity';
import { Op, Sequelize } from 'sequelize';
import { Report } from 'src/reports/entities/report.entity';
import { OiKse } from 'src/oi_kse/entities/oi_kse.entity';
import * as bcrypt from 'bcryptjs';
import { CompanyTemplates } from './entities/company-templates.entity';
import { BeforeSync } from 'sequelize-typescript';
@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company) private companyRepository: typeof Company,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Report) private reportRepository: typeof Report,
    @InjectModel(OiKse) private oiKseRepository: typeof OiKse,
    @InjectModel(CompanyTemplates)
    private companyTemplatesRepository: typeof CompanyTemplates,

    private UsersService: UsersService,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      const company = await this.companyRepository.create(createCompanyDto);
      return company;
    } catch (error) {
      throw new HttpException(
        'Произошла ошибка при содании компании',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCompanies({ page, limit, search }) {
    const offset = (page - 1) * limit;
    const where: any = search
      ? { name: { [Op.iLike]: `%${search}%` } }
      : {};
    const companies = await this.companyRepository.findAndCountAll({
      where,
      attributes: [
        'id',
        'name',
        'activity',
        [
          Sequelize.literal(
            '(SELECT COUNT(*) FROM reports WHERE reports."companyId" = "Company"."id")',
          ),
          'reportsCount',
        ],
        [
          Sequelize.literal(
            `EXISTS(SELECT 1 FROM oi_kse WHERE oi_kse."oi_company_id" = "Company"."id" AND oi_kse."type" = 'oi')`,
          ),
          'hasOi',
        ],
        [
          Sequelize.literal(
            `EXISTS(SELECT 1 FROM oi_kse WHERE oi_kse."oi_company_id" = "Company"."id" AND oi_kse."type" = 'listing')`,
          ),
          'hasListing',
        ],
      ],
      order: [['name', 'asc']],
      limit,
      offset,
    });
    return companies;
  }

  async getCompaniesForOption() {
    const companies = await this.companyRepository.findAll({
      attributes: [
        ['id', 'value'],
        ['name', 'label'],
      ],
    });
    return companies;
  }

  async findOne(id: number) {
    const company = await this.companyRepository.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    return company;
  }

  async getOiKseLinksByCompanyId(id: number) {
    return this.oiKseRepository.findAll({
      where: { oi_company_id: id },
      attributes: ['id', 'oi_company_id', 'kse_company_id', 'type'],
      order: [['type', 'asc']],
    });
  }

  async createOiKseLinkByCompanyId(
    companyId: number,
    data: { kse_company_id: number; type: string },
  ) {
    const { kse_company_id, type } = data;
    const typeValue = String(type || '').toLowerCase();
    if (!['oi', 'listing'].includes(typeValue)) {
      throw new HttpException('Некорректный тип связки', HttpStatus.BAD_REQUEST);
    }
    const exists = await this.oiKseRepository.findOne({
      where: { oi_company_id: companyId, type: typeValue },
    });
    if (exists) {
      throw new HttpException(
        'Связка с таким типом уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.oiKseRepository.create({
      oi_company_id: Number(companyId),
      kse_company_id: Number(kse_company_id),
      type: typeValue,
    } as any);
  }

  async updateOiKseLinkByCompanyId(
    companyId: number,
    linkId: number,
    data: { kse_company_id: number; type: string },
  ) {
    const link = await this.oiKseRepository.findOne({
      where: { id: linkId, oi_company_id: companyId },
    });
    if (!link) {
      throw new HttpException('Связка не найдена', HttpStatus.NOT_FOUND);
    }
    const typeValue = String(data.type || '').toLowerCase();
    if (!['oi', 'listing'].includes(typeValue)) {
      throw new HttpException('Некорректный тип связки', HttpStatus.BAD_REQUEST);
    }
    const duplicate = await this.oiKseRepository.findOne({
      where: {
        oi_company_id: companyId,
        type: typeValue,
        id: { [Op.ne]: linkId },
      },
    });
    if (duplicate) {
      throw new HttpException(
        'Связка с таким типом уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    link.kse_company_id = Number(data.kse_company_id);
    link.type = typeValue;
    await link.save();
    return link;
  }

  async removeOiKseLinkByCompanyId(companyId: number, linkId: number) {
    const deleted = await this.oiKseRepository.destroy({
      where: { id: linkId, oi_company_id: companyId },
    });
    if (!deleted) {
      throw new HttpException('Связка не найдена', HttpStatus.NOT_FOUND);
    }
    return { success: true };
  }

  async getTemplate(form_type: string) {
    const temp = await this.companyTemplatesRepository.findOne({
      where: {
        form_type,
      },
    });
    return temp;
  }

  async updateCompany(updateCompanyDto: UpdateCompanyDto) {
    const company = await this.companyRepository.findByPk(updateCompanyDto.id);
    if (!company) {
      throw new HttpException('Компания не найден', HttpStatus.NOT_FOUND);
    }

    // Update the company's attributes with the new data
    Object.assign(company, updateCompanyDto);

    // Save the updated company in the database
    await company.save();
    return company;
  }

  async deleteCompany({ companyId, confirmPassword, userId }) {
    const user = await this.UsersService.getUserPasswordForCompare(userId);
    if (await bcrypt.compare(confirmPassword, user.password)) {
      const company = await this.companyRepository.destroy({
        where: { id: companyId },
      });
      return company;
    }
    throw new HttpException('Некорректный пароль!', HttpStatus.BAD_REQUEST);
  }

  async getCompanyByInn(inn: string){
    const company = await this.companyRepository.findOne({
      where: {
        inn
      }
    })
    return company
  }

  async createMockData() {
    const data = [];
    try {
      // return await this.companyRepository.bulkCreate(data);
      // const users = await this.userRepository.bulkCreate(data);
      return 'users';
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
