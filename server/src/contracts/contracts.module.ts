import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Contracts } from './entities/contract.entity';
import { ContractTypes } from './entities/contract-types.entity';
import { ContractTemplates } from './entities/contract-templates.entity';
import { ContractUsers } from './entities/contract-users.entity';
import { ContractStatus } from './entities/contract-status.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Contracts,
      ContractTypes,
      ContractTemplates,
      ContractUsers,
      ContractStatus,
    ]),
  ],
  controllers: [ContractsController],
  providers: [ContractsService]
})
export class ContractsModule {}
