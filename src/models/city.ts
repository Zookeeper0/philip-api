import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface cityAttributes {
    oid: string;
    name?: string;
    createAt?: Date;
    disabled?: boolean;
    nameEng?: string;
}

@Table({
	tableName: "city",
	timestamps: false 
})
export class city extends Model<cityAttributes, cityAttributes> implements cityAttributes {

    @Column({
    	primaryKey: true,
    	type: DataType.STRING(100) 
    })
    @Index({
    	name: "city_pkey",
    	using: "btree",
    	unique: true 
    })
    	oid!: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(50) 
    })
    	name?: string;

    @Column({
    	field: "create_at",
    	allowNull: true,
    	type: DataType.DATE,
    	defaultValue: Sequelize.literal("now()") 
    })
    	createAt?: Date;

    @Column({
    	allowNull: true,
    	type: DataType.BOOLEAN 
    })
    	disabled?: boolean;

    @Column({
    	field: "name_eng",
    	allowNull: true,
    	type: DataType.STRING(50) 
    })
    	nameEng?: string;

}