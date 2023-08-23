import {
  Table,
  Column,
  DataType,
  ForeignKey,
  Model,
  BelongsTo,
} from 'sequelize-typescript';
import { Company } from 'src/companies/entities/company.entity';
import { User } from 'src/users/entities/user.entity';
import { ReportTypes } from './report-types.entity';
import { ReportStatus } from './report-status.entity';

interface ReportCreateAttrs {
  typeId: number;
  statusId: number;
  content: string;
  userId: number;
}

@Table({ tableName: 'reports' })
export class Report extends Model<Report, ReportCreateAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => ReportTypes)
  @Column({ type: DataType.INTEGER })
  typeId: number;

  @ForeignKey(() => ReportStatus)
  @Column({ type: DataType.INTEGER })
  statusId: number;

  @Column({ type: DataType.TEXT })
  content: string;

  @Column({ type: DataType.DATE })
  sendDate: Date;

  @Column({ type: DataType.DATE })
  confirmDate: Date;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => Company)
  @Column({ type: DataType.INTEGER })
  companyId: number;

  @BelongsTo(() => ReportTypes)
  type: ReportTypes;

  @BelongsTo(() => ReportStatus)
  status: ReportStatus;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Company)
  company: Company;
}
