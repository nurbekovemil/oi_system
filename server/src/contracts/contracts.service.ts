import { Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Contracts } from './entities/contract.entity';
import { ContractTypes } from './entities/contract-types.entity';
import { ContractCompanies } from './entities/contract-companies.entity';
import { ContractTemplates } from './entities/contract-templates.entity';
import { ContractStatus } from './entities/contract-status.entity';
import { Company } from 'src/companies/entities/company.entity';
import sequelize from 'sequelize';

@Injectable()
export class ContractsService {
  constructor(
    @InjectModel(Contracts) private contractRepository: typeof Contracts,
    @InjectModel(ContractTypes) private contractTypeRepository: typeof ContractTypes,
    @InjectModel(ContractCompanies) private contractCompanyRepository: typeof ContractCompanies,
    @InjectModel(ContractTemplates) private contractTemplateRepository: typeof ContractTemplates,
    @InjectModel(ContractStatus) private contractSatusRepository: typeof ContractStatus,
  ) {}
  
  async getContractList() {
    const contracts = await this.contractRepository.findAll({
      attributes: {
        exclude: ['content', 'updatedAt'],
        include: [
          'id',
          'companyId',
          'typeId',
          'content',
          [sequelize.literal(`DATE("Contracts"."createdAt")`), 'createdAt'],
        ]
      },
      include: [
        {
          model: ContractTypes
        },
        {
          model: ContractCompanies,
          include: [
            {
              model: Company,
              attributes: ['id', 'name']
            },
            {
              model: ContractStatus
            }
          ]
        }
      ]
    })
    return contracts
  }

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

  async getContractById(id: number) {
    const contract = await this.contractRepository.findOne({
      where: {
        id
      },
      include: [
        {
          model: ContractCompanies,
          attributes: ['id','cert'],
          include: [
            {
              model: Company,
              attributes: ['id', 'name']
            },
            {
              model: ContractStatus
            }
          ]
        }
      ]
    })
    return contract
  }

  async createContract(createContractDto: CreateContractDto) {
    const contract = await this.contractRepository.create(createContractDto.contract)
    createContractDto.contract_companies.forEach(async (companyId) => {
      await this.contractCompanyRepository.create({
        contractId: contract.id,
        companyId,
        statusId: 1
      })
    })
    return contract
  }

  async signContractRutoken({ companyId }, { contractId, hash, cert }) {
    const contractEds = await this.contractCompanyRepository.findOne({
      where: {
        contractId,
        companyId
      }
    })
    if(!contractEds) throw new Error('Документ не найден')
    contractEds.cert = cert
    contractEds.hash = hash
    contractEds.statusId = 2
    contractEds.save()
    return contractEds
  }

}
