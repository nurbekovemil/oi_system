import {
  Table,
  Column,
  DataType,
  ForeignKey,
  Model,
  BelongsTo,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { Company } from 'src/companies/entities/company.entity';
import { User } from 'src/users/entities/user.entity';
import { ReportTypes } from './report-types.entity';
import { ReportStatus } from './report-status.entity';
import { Eds } from 'src/eds/entities/ed.entity';
import { Receipt } from 'src/receipts/entities/receipt.entity';

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

  @Column({ type: DataType.JSON })
  content: object;

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

  @HasMany(() => Eds)
  eds: Eds;

  @HasOne(() => Receipt)
  receipt: Receipt;
}
