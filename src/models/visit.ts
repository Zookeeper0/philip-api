import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface visitAttributes {
    oid: string;
    ip?: string;
    createdAt?: Date;
}

@Table({
	tableName: "visit",
	timestamps: false 
})
export class visit extends Model<visitAttributes, visitAttributes> implements visitAttributes {

    @Column({
    	primaryKey: true,
    	type: DataType.STRING(100) 
    })
    @Index({
    	name: "visit_pkey",
    	using: "btree",
    	unique: true 
    })
    	oid!: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(100) 
    })
    	ip?: string;

    @Column({
    	allowNull: true,
    	type: DataType.DATE,
    	defaultValue: Sequelize.literal("now()") 
    })
    	createdAt?: Date;

}