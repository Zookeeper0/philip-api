import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from "sequelize-typescript";

export interface postAttributes {
  oid: string;
  adminOid?: string;
  title?: string;
  categoryOid?: string;
  address?: string;
  phoneNumber?: string;
  contents?: string;
  views?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({
  tableName: "post",
  timestamps: false,
})
export class post
  extends Model<postAttributes, postAttributes>
  implements postAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.STRING(100),
  })
  @Index({
    name: "post_pkey",
    using: "btree",
    unique: true,
  })
  oid!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
  })
  adminOid?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
  })
  categoryOid?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
  })
  title?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
  })
  address?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
  })
  phoneNumber?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
  })
  contents?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  views?: number;

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
