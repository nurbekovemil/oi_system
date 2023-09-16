import { Module } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Receipt } from './entities/receipt.entity';
import { ReportsModule } from 'src/reports/reports.module';

@Module({
  imports: [SequelizeModule.forFeature([Receipt]), ReportsModule],
  controllers: [],
  providers: [ReceiptsService],
  exports: [ReceiptsService],
})
export class ReceiptsModule {}
