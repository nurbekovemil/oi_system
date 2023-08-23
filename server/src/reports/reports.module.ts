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
import { ReportTemplates } from './entities/report-templates.entity';
import { ReportGroups } from './entities/report-groups.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Company,
      User,
      ReportTemplates,
      ReportGroups,
      ReportTypes,
      ReportStatus,
      Report,
    ]),
    JwtModule,
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
