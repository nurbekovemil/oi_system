import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserTempCreateAttrs {
  title: string;
  formType: string;
  template: object;
}

@Table({ tableName: 'user_temp', timestamps: false })
export class UserTemp extends Model<UserTemp, UserTempCreateAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  title: string;

  @Column({ type: DataType.STRING })
  form_type: string;

  @Column({ type: DataType.JSON })
  template: object[];
}
