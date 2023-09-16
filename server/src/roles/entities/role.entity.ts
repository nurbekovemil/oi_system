export class Role {}
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

import { User } from '../../users/entities/user.entity';
import { RoleUsers } from './role-users.entity';
import sequelize from 'sequelize';

interface RolesCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: 'roles', createdAt: false, updatedAt: false })
export class Roles extends Model<Roles, RolesCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => User, () => RoleUsers)
  users: User[];
}
