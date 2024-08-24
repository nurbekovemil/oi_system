import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Contracts } from './entities/contract.entity';
import { ContractTypes } from './entities/contract-types.entity';
import { ContractTemplates } from './entities/contract-templates.entity';
import { ContractCompanies } from './entities/contract-companies.entity';
import { ContractStatus } from './entities/contract-status.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Contracts,
      ContractTypes,
      ContractTemplates,
      ContractCompanies,
      ContractStatus,
    ]),
  ],
  controllers: [ContractsController],
  providers: [ContractsService],
  exports: [ContractsService],
})
export class ContractsModule {}
