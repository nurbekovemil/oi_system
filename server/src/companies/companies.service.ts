import { UsersService } from './../users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Company } from './entities/company.entity';
import { User } from 'src/users/entities/user.entity';
import { Sequelize } from 'sequelize';
import { Report } from 'src/reports/entities/report.entity';
import * as bcrypt from 'bcryptjs';
import { CompanyTemplates } from './entities/company-templates.entity';
import { BeforeSync } from 'sequelize-typescript';
@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company) private companyRepository: typeof Company,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Report) private reportRepository: typeof Report,
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

  async getCompaniesWithUserReportCount() {
    const companies = await this.companyRepository.findAll({
      include: [
        {
          model: this.userRepository,
          attributes: [],
        },
        {
          model: this.reportRepository,
          attributes: [],
        },
      ],
      attributes: [
        'id',
        'name',
        'activity',
        [Sequelize.fn('COUNT', Sequelize.col('users.id')), 'countUsers'],
        [Sequelize.fn('COUNT', Sequelize.col('reports.id')), 'countReports'],
      ],
      group: ['Company.id'],
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
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
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

  //   async createMockData() {

  //     try {
  //       return this.companyRepository.bulkCreate(data);
  //     } catch (error) {
  //       console.log(error);
  //       throw new HttpException(error, HttpStatus.BAD_REQUEST);
  //     }
  //   }
}
