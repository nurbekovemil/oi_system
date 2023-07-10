import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

import { Company } from 'src/companies/entities/company.entity';
import { Report } from 'src/reports/entities/report.entity';

interface UserCreateAttrs {
  name: string;
  login: string;
  password: string;
  companyId: number;
  firstName: string;
  lastName: string;
  inn: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreateAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING, unique: true })
  login: string;

  @Column({ type: DataType.STRING })
  password: string;

  @ForeignKey(() => Company)
  @Column({ type: DataType.INTEGER })
  companyId: number;

  @Column({ type: DataType.STRING })
  firstName: string;

  @Column({ type: DataType.STRING })
  lastName: string;

  @Column({ type: DataType.STRING, unique: true })
  inn: string;

  @HasMany(() => Report)
  reports: Report[];

  @BelongsTo(() => Company)
  company: Company;
}
