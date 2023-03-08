import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from "sequelize-typescript";

export interface categoryAttributes {
  oid: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({
  tableName: "category",
  timestamps: false,
})
export class category
  extends Model<categoryAttributes, categoryAttributes>
  implements categoryAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.STRING(100),
  })
  @Index({
    name: "category_pkey",
    using: "btree",
    unique: true,
  })
  oid!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
  })
  name?: string;

  @Column({
    field: "createdAt",
    allowNull: true,
    type: DataType.DATE,
    comment: "생성일",
    defaultValue: DataType.NOW,
  })
  createdAt?: Date;

  @Column({
    field: "updatedAt",
    allowNull: true,
    type: DataType.DATE,
    comment: "수정일",
    defaultValue: DataType.NOW,
  })
  updatedAt?: Date;
}
