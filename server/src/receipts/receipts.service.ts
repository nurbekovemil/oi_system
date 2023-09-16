import { ReportsService } from './../reports/reports.service';
import { Injectable } from '@nestjs/common';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Receipt } from './entities/receipt.entity';

@Injectable()
export class ReceiptsService {
  constructor(
    @InjectModel(Receipt) private receiptRepository: typeof Receipt,
    private ReportsService: ReportsService,
  ) {}
  async createReceipt(createReceiptDto: CreateReceiptDto) {
    const receipt = await this.receiptRepository.create(createReceiptDto);
    await this.ReportsService.updateReportStatus(createReceiptDto.reportId, 4);
    return receipt;
  }

  findOne(id: number) {
    return `This action returns a #${id} receipt`;
  }

  remove(id: number) {
    return `This action removes a #${id} receipt`;
  }
}
