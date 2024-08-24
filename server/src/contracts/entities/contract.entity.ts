export class Role {}
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Company } from 'src/companies/entities/company.entity';
import { ContractTypes } from './contract-types.entity';
import { ContractCompanies } from './contract-companies.entity';

interface ContractsCreationAttrs {
  companyId: number;
  typeId: number;
  content: string;
}

@Table({ tableName: 'contracts' })
export class Contracts extends Model<Contracts, ContractsCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Company)
  @Column({ type: DataType.INTEGER})
  companyId: number;

  @ForeignKey(() => ContractTypes)
  @Column({ type: DataType.INTEGER })
  typeId: number;

  @Column({ type: DataType.JSON })
  content: object;

  @BelongsTo(() => ContractTypes)
  contractType: ContractTypes

  @BelongsTo(() => Company)
  company: Company

  @HasMany(() => ContractCompanies)
  contractCompanies: ContractCompanies[]

}

