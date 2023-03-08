import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from "sequelize-typescript";

export interface filesAttributes {
  oid: string;
  workOid?: string;
  controlName?: string;
  sortNo?: number;
  path?: string;
  fileName?: string;
  fileExtension?: string;
  size?: number;
  originalName?: string;
  mimetype?: string;
  doneYn?: number;
  createId?: string;
  createIp?: string;
  createdAt?: Date;
  updateId?: string;
  updateIp?: string;
  updatedAt?: Date;
  postId?: string;
}

@Table({
  tableName: "files",
  timestamps: false,
})
export class files
  extends Model<filesAttributes, filesAttributes>
  implements filesAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.STRING(100),
  })
  @Index({
    name: "files_pkey",
    using: "btree",
    unique: true,
  })
  oid!: string;

  @Column({
    field: "workOid",
    allowNull: true,
    type: DataType.STRING(100),
  })
  workOid?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
  })
  postOid?: string;

  @Column({
    field: "controlName",
    allowNull: true,
    type: DataType.STRING(100),
  })
  controlName?: string;

  @Column({
    field: "sortNo",
    allowNull: true,
    type: DataType.INTEGER,
  })
  sortNo?: number;

  @Column({
    field: "Path",
    allowNull: true,
    type: DataType.STRING(100),
  })
  path?: string;

  @Column({
    field: "fileName",
    allowNull: true,
    type: DataType.STRING(100),
  })
  fileName?: string;

  @Column({
    field: "fileExtension",
    allowNull: true,
    type: DataType.STRING(100),
  })
  fileExtension?: string;

  @Column({
    field: "Size",
    allowNull: true,
    type: DataType.INTEGER,
  })
  size?: number;

  @Column({
    field: "originalName",
    allowNull: true,
    type: DataType.STRING(100),
  })
  originalName?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
  })
  mimetype?: string;

  @Column({
    field: "doneYn",
    allowNull: true,
    type: DataType.INTEGER,
  })
  doneYn?: number;

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
