import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Company } from './entities/company.entity';
import { User } from 'src/users/entities/user.entity';
import { Report } from 'src/reports/entities/report.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { CompanyTemp } from './entities/company-temp.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Company, CompanyTemp, User, Report]),
    JwtModule,
    UsersModule,
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
