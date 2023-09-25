import { ReportsService } from './../reports/reports.service';
import { Injectable } from '@nestjs/common';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Receipt } from './entities/receipt.entity';
import sequelize from 'sequelize';

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

  async getReceiptById(id: number) {
    const { reportId, cert, createdAt } = await this.receiptRepository.findByPk(
      id,
      {
        attributes: [
          'reportId',
          'cert',
          [sequelize.fn('DATE', sequelize.col('createdAt')), 'createdAt'],
        ],
      },
    );
    const { company, type } = await this.ReportsService.getReportById(reportId);
    return {
      receipt: { reportId, cert, createdAt },
      report: { company, type },
    };
  }
}
