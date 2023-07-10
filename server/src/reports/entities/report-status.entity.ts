import {
  Table,
  Column,
  DataType,
  ForeignKey,
  Model,
} from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

interface ReportStatusCreateAttrs {
  title: string;
}

@Table({ tableName: 'report_status' })
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
}
