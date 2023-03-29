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
  adminId?: string;
  storeName?: string;
  categoryId?: string;
  address?: string;
  phoneNumber?: string;
  content?: string;
  views?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({
  tableName: "Post",
  timestamps: false,
})
export class post
  extends Model<postAttributes, postAttributes>
  implements postAttributes
{
  @Column({
    field: "Oid",
    primaryKey: true,
    type: DataType.STRING,
  })
  @Index({
    name: "Post_pkey",
    using: "btree",
    unique: true,
  })
  oid!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  adminId?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  storeName?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  categoryId?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  address?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  phoneNumber?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  content?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  views?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
  })
  createdAt?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
  })
  updatedAt?: Date;
}
