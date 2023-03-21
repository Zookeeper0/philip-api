import { Column, DataType, Model, Table } from "sequelize-typescript";

export interface adminAttributes {
  id?: string;
  account: string;
  password: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ tableName: "admin", timestamps: false, comment: "관리자" })
export class Admin
  extends Model<adminAttributes, adminAttributes>
  implements adminAttributes
{
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    comment: "키값",
  })
  id?: string;

  @Column({
    type: DataType.STRING(25),
    comment: "관리자 아이디",
  })
  account: string;

  @Column({
    type: DataType.STRING(255),
    comment: "관리자 비밀번호",
  })
  password: string;

  @Column({
    type: DataType.STRING(100),
    comment: "관리자 이름",
  })
  name: string;

  @Column({ allowNull: true, type: DataType.DATE, defaultValue: DataType.NOW })
  createDate?: Date;

  @Column({ allowNull: true, type: DataType.DATE, defaultValue: DataType.NOW })
  updateDate?: Date;
}
