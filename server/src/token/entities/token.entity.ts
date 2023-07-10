import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { User } from 'src/users/entities/user.entity';

interface TokenCreateAttrs {
  userId: number;
  refreshToken: string;
}

@Table({ tableName: 'tokens', timestamps: false })
export class Token extends Model<Token, TokenCreateAttrs> {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: User;

  @Column({ type: DataType.STRING, unique: true })
  refreshToken: string;
}
