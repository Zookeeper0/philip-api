import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface kakaoUserAttributes {
    oid: string;
    accessToken?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

@Table({
	tableName: "kakaoUser",
	timestamps: false 
})
export class kakaoUser extends Model<kakaoUserAttributes, kakaoUserAttributes> implements kakaoUserAttributes {

    @Column({
    	primaryKey: true,
    	type: DataType.STRING(100) 
    })
    @Index({
    	name: "kakaoUser_pkey",
    	using: "btree",
    	unique: true 
    })
    	oid!: string;

    @Column({
    	field: "access_token",
    	allowNull: true,
    	type: DataType.STRING(255) 
    })
    	accessToken?: string;

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