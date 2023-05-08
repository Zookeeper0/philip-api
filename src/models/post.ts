import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { admin } from "./admin";
import { category } from "./category";
import { files } from "./files";

export interface postAttributes {
  oid: string;
  adminOid?: string;
  categoryOid?: string;
  storeName?: string;
  address?: string;
  phoneNumber?: string;
  contents?: string;
  views?: number;
  createdAt?: Date;
  updatedAt?: Date;
  cityOid?: string;
  promotion?: boolean;
  ownerName?: string;
  remark?: string;
  order?: number;
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

  @ForeignKey(() => admin)
  @Column({
    field: "admin_oid",
    allowNull: true,
    type: DataType.STRING(100),
  })
  adminOid?: string;

  @ForeignKey(() => category)
  @Column({
    field: "category_oid",
    allowNull: true,
    type: DataType.STRING(100),
  })
  categoryOid?: string;

  @Column({
    field: "store_name",
    allowNull: true,
    type: DataType.STRING(100),
  })
  storeName?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
  })
  address?: string;

  @Column({
    field: "phone_number",
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

  @Column({
    field: "city_oid",
    allowNull: true,
    type: DataType.STRING(100),
  })
  cityOid?: string;

  @Column({
    allowNull: true,
    type: DataType.BOOLEAN,
    defaultValue: Sequelize.literal("false"),
  })
  promotion?: boolean;

  @Column({
    field: "owner_name",
    allowNull: true,
    type: DataType.STRING(50),
  })
  ownerName?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
  })
  remark?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  order?: number;

  @ForeignKey(() => admin)
  @ForeignKey(() => category)
  @BelongsTo(() => category, { as: "category", foreignKey: "category_oid" })
  category: category;

  @HasMany(() => files, { as: "thumb" })
  thumb: files;
  @HasMany(() => files, { as: "detail" })
  detail: files;
  @HasMany(() => files, { as: "menu" })
  menu: files;
}
