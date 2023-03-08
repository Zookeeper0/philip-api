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
    	allowNull: true,
    	type: DataType.STRING(255) 
    })
    	accessToken?: string;

    @Column({
    	allowNull: true,
    	type: DataType.DATE,
    	defaultValue: Sequelize.literal("now()") 
    })
    	createdAt?: Date;

    @Column({
    	allowNull: true,
    	type: DataType.DATE 
    })
    	updatedAt?: Date;

}