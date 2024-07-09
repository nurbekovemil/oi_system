import {
    Table,
    Column,
    DataType,
    Model,
    ForeignKey,
    HasMany,
    BelongsTo,
  } from 'sequelize-typescript';
import { ContractTemplates } from './contract-templates.entity';

  interface ContractTypesCreateAttrs {
    title: string;
    tempId: number;
  }

  @Table({ tableName: 'contract_types', timestamps: false })
  export class ContractTypes extends Model<ContractTypes, ContractTypesCreateAttrs> {
    @Column({
      type: DataType.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    })
    id: number;

    @Column({ type: DataType.TEXT })
    title: string;
    
    @ForeignKey(() => ContractTemplates)
    @Column({ type: DataType.INTEGER })
    tempId: number;

    @BelongsTo(() => ContractTemplates)
    templates: ContractTemplates

}
  