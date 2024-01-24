import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/entities/user.entity';
import { Company } from 'src/companies/entities/company.entity';
import { Report } from 'src/reports/entities/report.entity';
import { ReportTypes } from 'src/reports/entities/report-types.entity';
import { ReportStatus } from 'src/reports/entities/report-status.entity';
import { Eds } from 'src/eds/entities/ed.entity';
import { Receipt } from 'src/receipts/entities/receipt.entity';
import { RoleAllowedReports } from 'src/roles/entities/role-allowed-reports.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      Company,
      Report,
      ReportTypes,
      ReportStatus,
      Eds,
      Receipt,
      RoleAllowedReports,
    ]),
    JwtModule,
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
