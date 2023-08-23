import {
  Table,
  Column,
  DataType,
  ForeignKey,
  Model,
  HasMany,
} from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';
import { Report } from './report.entity';

interface ReportStatusCreateAttrs {
  title: string;
  color: string;
  type: string;
}

@Table({ tableName: 'report_status', timestamps: false })
export class ReportStatus extends Model<ReportStatus, ReportStatusCreateAttrs> {
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
  type: string;

  @HasMany(() => Report)
  reports: Report[];
}
