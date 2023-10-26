import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Roles } from './role.entity';

@Table({
  tableName: 'role_allowed_reports',
  createdAt: false,
  updatedAt: false,
})
export class RoleAllowedReports extends Model<RoleAllowedReports> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Roles)
  @Column({ type: DataType.INTEGER })
  roleId: number;

  @Column({ type: DataType.ARRAY(DataType.INTEGER) })
  report_types: number[];

  @Column({ type: DataType.ARRAY(DataType.INTEGER) })
  report_status: number[];
}
