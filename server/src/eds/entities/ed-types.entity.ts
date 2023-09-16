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

import { User } from 'src/users/entities/user.entity';
import { Eds } from './ed.entity';

interface EdsTypesCreateAttrs {
  title: string;
}

@Table({ tableName: 'eds_types', timestamps: false })
export class EdsTypes extends Model<EdsTypes, EdsTypesCreateAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  title: string;

  @HasMany(() => Eds)
  eds: Eds[];
}
