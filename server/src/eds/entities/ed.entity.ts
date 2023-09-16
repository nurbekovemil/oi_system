import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Company } from 'src/companies/entities/company.entity';
import { Report } from 'src/reports/entities/report.entity';

import { User } from 'src/users/entities/user.entity';
import { EdsTypes } from './ed-types.entity';

interface EdsCreateAttrs {
  typeId: number;
  reportId: number;
  cert: string;
  hash: string;
  userId: number;
  companyId: number;
}

@Table({ tableName: 'eds' })
export class Eds extends Model<Eds, EdsCreateAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => EdsTypes)
  @Column({ type: DataType.INTEGER })
  typeId: EdsTypes;

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

  @ForeignKey(() => Company)
  @Column({ type: DataType.INTEGER })
  companyId: Company;

  @BelongsTo(() => Report)
  report: Report;

  @BelongsTo(() => EdsTypes)
  edsTypes: EdsTypes;
}
