import {
    Table,
    Column,
    DataType,
    Model,
    ForeignKey,
  } from 'sequelize-typescript';
import { Contracts } from './contract.entity';
import { Company } from 'src/companies/entities/company.entity';
import { User } from 'src/users/entities/user.entity';
import { ContractStatus } from './contract-status.entity';

  interface ContractUsersCreateAttrs {
    contractId: number;
    companyId: number;
    userId: number;
    statusId: number;
  }

  @Table({ tableName: 'contract_users'})
  export class ContractUsers extends Model<ContractUsers, ContractUsersCreateAttrs> {
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

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @ForeignKey(() => ContractStatus)
    @Column({ type: DataType.INTEGER })
    statusId: number;

    @Column({ type: DataType.JSON })
    cert: object;
  
    @Column({ type: DataType.JSON })
    hash: object;
}
  