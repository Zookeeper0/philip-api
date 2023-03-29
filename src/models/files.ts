import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface filesAttributes {
    oid: string;
    postOid?: string;
    sortNo?: number;
    path?: string;
    filename?: string;
    fileExtension?: string;
    size?: number;
    originalname?: string;
    mimetype?: string;
    doneYn?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

@Table({
	tableName: "files",
	timestamps: false 
})
export class files extends Model<filesAttributes, filesAttributes> implements filesAttributes {

    @Column({
    	primaryKey: true,
    	type: DataType.STRING(100) 
    })
    @Index({
    	name: "files_pkey",
    	using: "btree",
    	unique: true 
    })
    	oid!: string;

    @Column({
    	field: "post_oid",
    	allowNull: true,
    	type: DataType.STRING(100) 
    })
    	postOid?: string;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	sortNo?: number;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(100) 
    })
    	path?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(100) 
    })
    	filename?: string;

    @Column({
    	field: "file_extension",
    	allowNull: true,
    	type: DataType.STRING(100) 
    })
    	fileExtension?: string;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	size?: number;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(100) 
    })
    	originalname?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(100) 
    })
    	mimetype?: string;

    @Column({
    	field: "done_yn",
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	doneYn?: number;

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