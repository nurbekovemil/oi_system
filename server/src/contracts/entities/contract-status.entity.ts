import {
    Table,
    Column,
    DataType,
    Model,
    HasMany,
  } from 'sequelize-typescript';
import { ContractCompanies } from './contract-companies.entity';

  interface ContractStatusCreateAttrs {
    title: string;
  }

  @Table({ tableName: 'contract_status', timestamps: false })
  export class ContractStatus extends Model<ContractStatus, ContractStatusCreateAttrs> {
    @Column({
      type: DataType.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    })
    id: number;

    @Column({ type: DataType.TEXT })
    title: string;

    @HasMany(() => ContractCompanies)
    contractCompanies: ContractCompanies[]
}
  