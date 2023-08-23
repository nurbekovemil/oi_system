import { Table, Column, DataType, Model, HasMany } from 'sequelize-typescript';
import { ReportTypes } from './report-types.entity';
interface ReportGroupsCreateAttrs {
  title: string;
}
@Table({ tableName: 'report_groups', timestamps: false })
export class ReportGroups extends Model<ReportGroups, ReportGroupsCreateAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  title: string;

  @HasMany(() => ReportTypes)
  types: ReportTypes[];
}
