import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Report } from './entities/report.entity';
import { User } from 'src/users/entities/user.entity';
import { ReportStatus } from './entities/report-status.entity';
import { Company } from 'src/companies/entities/company.entity';
import { JwtModule } from '@nestjs/jwt';
import { ReportTypes } from './entities/report-types.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      Report,
      ReportStatus,
      ReportTypes,
      Company,
    ]),
    JwtModule,
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
