import { Module } from '@nestjs/common';
import { OiKseService } from './oi_kse.service';
import { OiKseController } from './oi_kse.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OiKse } from './entities/oi_kse.entity';
import { Report } from 'src/reports/entities/report.entity';
import { ReportTypes } from 'src/reports/entities/report-types.entity';
import { ReportsModule } from 'src/reports/reports.module';

@Module({
  imports: [SequelizeModule.forFeature([OiKse]), ReportsModule],
  controllers: [OiKseController],
  providers: [OiKseService],
})
export class OiKseModule {}
