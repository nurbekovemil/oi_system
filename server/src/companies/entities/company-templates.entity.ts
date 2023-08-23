import {
  AfterBulkCreate,
  AfterSync,
  BeforeCreate,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
interface CompanyTemplatesCreateAttrs {
  title: string;
  formType: string;
  template: object[];
}

@Table({ tableName: 'company_templates', timestamps: false })
export class CompanyTemplates extends Model<
  CompanyTemplates,
  CompanyTemplatesCreateAttrs
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  title: string;

  @Column({ type: DataType.STRING })
  form_type: string;

  @Column({ type: DataType.JSON })
  template: object[];
}
