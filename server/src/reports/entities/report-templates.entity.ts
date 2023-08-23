import {
  Table,
  Column,
  DataType,
  ForeignKey,
  Model,
  HasMany,
} from 'sequelize-typescript';
import { ReportTypes } from './report-types.entity';
interface ReportTemplatesCreateAttrs {
  template: object[];
}
@Table({ tableName: 'report_templates', timestamps: false })
export class ReportTemplates extends Model<
  ReportTemplates,
  ReportTemplatesCreateAttrs
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

  @HasMany(() => ReportTypes)
  types: ReportTypes[];
}
