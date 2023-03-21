import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface postAttributes {
    oid: string;
    adminOid?: string;
    categoryOid?: string;
    title?: string;
    address?: string;
    phoneNumber?: string;
    contents?: string;
    views?: number;
    createdAt?: Date;
    updatedAt?: Date;
    cityOid?: string;
    promotion?: boolean;
}

@Table({
	tableName: "post",
	timestamps: false 
})
export class post extends Model<postAttributes, postAttributes> implements postAttributes {

    @Column({
    	primaryKey: true,
    	type: DataType.STRING(100) 
    })
    @Index({
    	name: "post_pkey",
    	using: "btree",
    	unique: true 
    })
    	oid!: string;

    @Column({
    	field: "admin_oid",
    	allowNull: true,
    	type: DataType.STRING(100) 
    })
    	adminOid?: string;

    @Column({
    	field: "category_oid",
    	allowNull: true,
    	type: DataType.STRING(100) 
    })
    	categoryOid?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(100) 
    })
    	title?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(100) 
    })
    	address?: string;

    @Column({
    	field: "phone_number",
    	allowNull: true,
    	type: DataType.STRING(50) 
    })
    	phoneNumber?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(500) 
    })
    	contents?: string;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	views?: number;

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
    	field: "city_oid",
    	allowNull: true,
    	type: DataType.STRING(100) 
    })
    	cityOid?: string;

    @Column({
    	allowNull: true,
    	type: DataType.BOOLEAN 
    })
    	promotion?: boolean;

}