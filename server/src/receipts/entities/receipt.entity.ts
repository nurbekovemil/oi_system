import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Report } from 'src/reports/entities/report.entity';

import { User } from 'src/users/entities/user.entity';

interface ReceiptCreateAttrs {
  reportId: number;
  cert: string;
  hash: string;
  userId: number;
}

@Table({ tableName: 'receipts' })
export class Receipt extends Model<Receipt, ReceiptCreateAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Report)
  @Column({ type: DataType.INTEGER })
  reportId: Report;

  @Column({ type: DataType.JSON })
  cert: object;

  @Column({ type: DataType.JSON })
  hash: object;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: User;

  @BelongsTo(() => Report)
  report: Report;
}
