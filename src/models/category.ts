import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface categoryAttributes {
    oid: string;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

@Table({
	tableName: "category",
	timestamps: false 
})
export class category extends Model<categoryAttributes, categoryAttributes> implements categoryAttributes {

    @Column({
    	primaryKey: true,
    	type: DataType.STRING(100) 
    })
    @Index({
    	name: "category_pkey",
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

}