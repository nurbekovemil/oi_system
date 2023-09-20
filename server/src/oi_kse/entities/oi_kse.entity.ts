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

interface OiKseCreateAttrs {
  oiCompanyId: number;
  kseCompanyId: number;
}

@Table({ tableName: 'oi_kse', timestamps: false })
export class OiKse extends Model<OiKse, OiKseCreateAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER })
  oi_company_id: number;

  @Column({ type: DataType.INTEGER })
  kse_company_id: number;

  @Column({ type: DataType.STRING })
  type: string;
}
