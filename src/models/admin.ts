import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from "sequelize-typescript";

export interface adminAttributes {
  oid: string;
  adminId?: string;
  password?: Uint8Array;
  name?: string;
  birth?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({
  tableName: "admin",
  timestamps: false,
})
export class admin
  extends Model<adminAttributes, adminAttributes>
  implements adminAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.STRING(100),
  })
  @Index({
    name: "admin_pkey",
    using: "btree",
    unique: true,
  })
  oid!: string;

  @Column({
    field: "admin_id",
    allowNull: true,
    type: DataType.STRING(50),
  })
  adminId?: string;

  @Column({
    allowNull: true,
    type: DataType.BLOB,
  })
  password?: Uint8Array;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
  })
  name?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
  })
  birth?: Date;

  @Column({
    field: "created_at",
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal("now()"),
  })
  createdAt?: Date;

  @Column({
    field: "updated_at",
    allowNull: true,
    type: DataType.DATE,
  })
  updatedAt?: Date;
}
