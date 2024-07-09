import {
    Table,
    Column,
    DataType,
    ForeignKey,
    Model,
    HasMany,
    BelongsTo,
  } from 'sequelize-typescript';
import { ContractTypes } from './contract-types.entity';

  interface ContractTemplatesCreateAttrs {
    template: object[];
  }
  @Table({ tableName: 'contract_templates', timestamps: false })
  export class ContractTemplates extends Model<
    ContractTemplates,
    ContractTemplatesCreateAttrs
  > {
    @Column({
      type: DataType.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    })
    id: number;
  
    @Column({ type: DataType.JSON })
    template: object[];

    @HasMany(() => ContractTypes)
    contractType: ContractTypes
  }