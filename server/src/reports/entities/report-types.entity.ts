import {
  Table,
  Column,
  DataType,
  ForeignKey,
  Model,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { ReportTemplates } from './report-templates.entity';
import { Report } from './report.entity';
import { ReportGroups } from './report-groups.entity';
interface ReportTypesCreateAttrs {
  title: string;
  tempId: number;
}
@Table({ tableName: 'report_types', timestamps: false })
export class ReportTypes extends Model<ReportTypes, ReportTypesCreateAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.TEXT })
  title: string;

  @ForeignKey(() => ReportGroups)
  @Column({ type: DataType.INTEGER })
  groupId: number;

  @ForeignKey(() => ReportTemplates)
  @Column({ type: DataType.INTEGER })
  tempId: number;

  @BelongsTo(() => ReportGroups)
  group: ReportGroups;

  @BelongsTo(() => ReportTemplates)
  template: ReportTemplates;

  @HasMany(() => Report)
  reports: Report[];
}
