import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface TokenChallengeCreateAttrs {
  id: string;
  nonce: string;
  expiresAt: Date;
  usedAt?: Date;
}

@Table({ tableName: 'token_challenges', timestamps: false })
export class TokenChallenge extends Model<
  TokenChallenge,
  TokenChallengeCreateAttrs
> {
  @Column({ type: DataType.STRING, primaryKey: true })
  id: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  nonce: string;

  @Column({ type: DataType.DATE, allowNull: false })
  expiresAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  usedAt: Date;
}
