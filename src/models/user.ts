import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface userAttributes {
    id: string;
    userId?: string;
    userName?: string;
    isAdmin?: boolean;
    createDate?: string;
}

@Table({
	tableName: "user",
	timestamps: false,
	comment: "유저 테스트 테이블" 
})
export class user extends Model<userAttributes, userAttributes> implements userAttributes {

    @Column({
    	primaryKey: true,
    	type: DataType.BIGINT 
    })
    @Index({
    	name: "user_pkey",
    	using: "btree",
    	unique: true 
    })
    	id!: string;

    @Column({
    	field: "user_id",
    	allowNull: true,
    	type: DataType.STRING(20) 
    })
    	userId?: string;

    @Column({
    	field: "user_name",
    	allowNull: true,
    	type: DataType.STRING(50) 
    })
    	userName?: string;

    @Column({
    	field: "is_admin",
    	allowNull: true,
    	type: DataType.BOOLEAN,
    	defaultValue: Sequelize.literal("false") 
    })
    	isAdmin?: boolean;

    @Column({
    	field: "create_date",
    	allowNull: true,
    	type: DataType.STRING,
    	defaultValue: Sequelize.literal("now()") 
    })
    	createDate?: string;

}