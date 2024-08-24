import {
    Table,
    Column,
    DataType,
    Model,
    ForeignKey,
    BelongsTo,
    HasOne,
  } from 'sequelize-typescript';
import { Contracts } from './contract.entity';
import { Company } from 'src/companies/entities/company.entity';
import { ContractStatus } from './contract-status.entity';

  interface ContractCompaniesCreateAttrs {
    contractId: number;
    companyId: number;
    statusId: number;
  }

  @Table({ tableName: 'contract_companies'})
  export class ContractCompanies extends Model<ContractCompanies, ContractCompaniesCreateAttrs> {
    @Column({
      type: DataType.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    })
    id: number;

    @ForeignKey(() => Contracts)
    @Column({ type: DataType.INTEGER })
    contractId: number;

    @ForeignKey(() => Company)
    @Column({ type: DataType.INTEGER })
    companyId: number;

    @ForeignKey(() => ContractStatus)
    @Column({ type: DataType.INTEGER })
    statusId: number;

    @Column({ type: DataType.JSON })
    cert: object;
  
    @Column({ type: DataType.JSON })
    hash: object;

    @BelongsTo(() => Contracts)
    contract: Contracts;

    @BelongsTo(() => Company)
    company: Company;

    @BelongsTo(() => ContractStatus)
    status: ContractStatus;
}
  