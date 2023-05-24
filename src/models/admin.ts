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
    department?: string;
    region?: string;
    note?: string;
}

@Table({
	tableName: "admin",
	timestamps: false 
})
export class admin extends Model<adminAttributes, adminAttributes> implements adminAttributes {

    @Column({
    	primaryKey: true,
    	type: DataType.STRING(100) 
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
    	type: DataType.STRING(50) 
    })
    	adminId?: string;

    @Column({
    	allowNull: true,
    	type: DataType.BLOB 
    })
    	password?: Uint8Array;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(50) 
    })
    	name?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING 
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

    @Column({
    	allowNull: true,
    	type: DataType.STRING(50) 
    })
    	department?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(50) 
    })
    	region?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(100) 
    })
    	note?: string;

}