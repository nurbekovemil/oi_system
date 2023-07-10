import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ReportTypes } from './entities/report-types.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(ReportTypes) private reportTypesRepository: typeof ReportTypes,
  ) {}
  async getReportTypes() {
    const types = await this.reportTypesRepository.findAll({
      attributes: [
        ['title', 'label'],
        ['id', 'value'],
      ],
    });
    return types;
  }
}
