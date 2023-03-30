import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface adminAttributes {
    oid: string;
    adminId?: string;
    password?: Uint8Array;
    name?: string;
    birth?: string;
    createdAt?: Date;
    updatedAt?: Date;
    role?: string;
}

@Table({
	tableName: "admin",
	timestamps: false 
})
export class admin extends Model<adminAttributes, adminAttributes> implements adminAttributes {

    @Column({
    	primaryKey: true,
    	type: DataType.STRING(100),
    	comment: "관리자oid" 
    })
    @Index({
    	name: "admin_pkey",
    	using: "btree",
    	unique: true 
    })
    	oid!: string;

    @Column({
    	field: "admin_id",
    	allowNull: true,
    	type: DataType.STRING(50),
    	comment: "아이디" 
    })
    	adminId?: string;

    @Column({
    	allowNull: true,
    	type: DataType.BLOB,
    	comment: "비밀번호" 
    })
    	password?: Uint8Array;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(50),
    	comment: "이름" 
    })
    	name?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING,
    	comment: "생년월일" 
    })
    	birth?: string;

    @Column({
    	field: "created_at",
    	allowNull: true,
    	type: DataType.DATE,
    	defaultValue: Sequelize.literal("now()") 
    })
    	createdAt?: Date;

    @Column({
    	field: "updated_at",
    	allowNull: true,
    	type: DataType.DATE 
    })
    	updatedAt?: Date;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(50) 
    })
    	role?: string;

}