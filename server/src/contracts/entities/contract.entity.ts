export class Role {}
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Company } from 'src/companies/entities/company.entity';
import { User } from 'src/users/entities/user.entity';
import { ContractTypes } from './contract-types.entity';

interface ContractsCreationAttrs {
  value: string;
  description: string;
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

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER})
  userId: number;

  @ForeignKey(() => ContractTypes)
  @Column({ type: DataType.INTEGER })
  typeId: number;

  @Column({ type: DataType.JSON })
  content: object;

  @BelongsTo(() => ContractTypes)
  contractType: ContractTypes

  @BelongsTo(() => User)
  user: User

  
}

