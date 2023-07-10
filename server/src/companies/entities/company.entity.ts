import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Report } from 'src/reports/entities/report.entity';
import { User } from 'src/users/entities/user.entity';

interface CompanyCreateAttrs {
  name: string;
  activity: string;
  phone_number: string;
  address: string;
  email: string;
  director: string;
  accounting: string;
  inn: string;
}

@Table({ tableName: 'companies' })
export class Company extends Model<Company, CompanyCreateAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  activity: string;

  @Column({ type: DataType.STRING })
  phone_number: string;

  @Column({ type: DataType.STRING })
  address: string;

  @Column({ type: DataType.STRING })
  email: string;

  @Column({ type: DataType.STRING })
  director: string;

  @Column({ type: DataType.STRING })
  accounting: string;

  @Column({ type: DataType.STRING, unique: true })
  inn: string;

  @HasMany(() => User)
  users: User[];

  @HasMany(() => Report)
  reports: Report[];
}
