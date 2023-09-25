import { Module } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Receipt } from './entities/receipt.entity';
import { ReportsModule } from 'src/reports/reports.module';
import { ReceiptsController } from './receipts.controller';

@Module({
  imports: [SequelizeModule.forFeature([Receipt]), ReportsModule],
  controllers: [ReceiptsController],
  providers: [ReceiptsService],
  exports: [ReceiptsService],
})
export class ReceiptsModule {}
