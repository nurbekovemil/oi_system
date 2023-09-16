import { Module } from '@nestjs/common';
import { EdsService } from './eds.service';
import { EdsController } from './eds.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { CompaniesModule } from 'src/companies/companies.module';
import { ReportsModule } from 'src/reports/reports.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { EdsTypes } from './entities/ed-types.entity';
import { User } from 'src/users/entities/user.entity';
import { Company } from 'src/companies/entities/company.entity';
import { Report } from 'src/reports/entities/report.entity';
import { Eds } from './entities/ed.entity';
import { ReceiptsModule } from 'src/receipts/receipts.module';

@Module({
  imports: [
    SequelizeModule.forFeature([EdsTypes, Eds, User, Company, Report]),
    UsersModule,
    JwtModule,
    CompaniesModule,
    ReportsModule,
    ReceiptsModule,
  ],
  controllers: [EdsController],
  providers: [EdsService],
})
export class EdsModule {}
