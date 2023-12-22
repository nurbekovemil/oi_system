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
import { FilesModule } from 'src/files/files.module';
import { Eds } from 'src/eds/entities/ed.entity';
import { Receipt } from 'src/receipts/entities/receipt.entity';
import { RoleAllowedReports } from 'src/roles/entities/role-allowed-reports.entity';
import { BotModule } from 'src/bot/bot.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Eds,
      Company,
      User,
      ReportTemplates,
      ReportGroups,
      ReportTypes,
      ReportStatus,
      Report,
      Receipt,
      RoleAllowedReports,
    ]),
    JwtModule,
    FilesModule,
    BotModule,
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
