import {
    Table,
    Column,
    DataType,
    ForeignKey,
    Model,
    HasMany,
  } from 'sequelize-typescript';

  interface ContractTemplatesCreateAttrs {
    template: object[];
  }
  @Table({ tableName: 'report_templates', timestamps: false })
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
  }