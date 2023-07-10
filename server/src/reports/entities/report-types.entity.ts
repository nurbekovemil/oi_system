import {
  Table,
  Column,
  DataType,
  ForeignKey,
  Model,
} from 'sequelize-typescript';
interface ReportTypesCreateAttrs {
  title: string;
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

  @Column({ type: DataType.STRING })
  title: string;
}
