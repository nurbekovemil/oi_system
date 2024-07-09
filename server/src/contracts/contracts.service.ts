import { Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Contracts } from './entities/contract.entity';
import { ContractTypes } from './entities/contract-types.entity';
import { ContractUsers } from './entities/contract-users.entity';
import { ContractTemplates } from './entities/contract-templates.entity';
import { ContractStatus } from './entities/contract-status.entity';

@Injectable()
export class ContractsService {
  constructor(
    @InjectModel(Contracts) private contractRepository: typeof Contracts,
    @InjectModel(ContractTypes) private contractTypeRepository: typeof ContractTypes,
    @InjectModel(ContractUsers) private contractUserRepository: typeof ContractUsers,
    @InjectModel(ContractTemplates) private contractTemplateRepository: typeof ContractTemplates,
    @InjectModel(ContractStatus) private contractSatusRepository: typeof ContractStatus,
  ) {}
  
  async getContractTypes() {
    const contractTypes = await this.contractTypeRepository.findAll()
    return contractTypes
  }

  async getContractTypeById(id: number) {
    const contractType = await this.contractTypeRepository.findOne({
      where: {
        id
      },
      include: [
        {
          model: ContractTemplates
        }
      ]
    })
    return contractType
  }
}
