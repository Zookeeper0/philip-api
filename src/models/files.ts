import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface filesAttributes {
    oid: string;
    workOid?: string;
    postOId?: string;
    controlName?: string;
    sortNo?: number;
    path?: string;
    fileName?: string;
    fileExtension?: string;
    size?: number;
    originalName?: string;
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
    	allowNull: true,
    	type: DataType.STRING(100) 
    })
    	workOid?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(100) 
    })
    	postOId?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(100) 
    })
    	controlName?: string;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	sortNo?: number;

    @Column({
    	field: "Path",
    	allowNull: true,
    	type: DataType.STRING(100) 
    })
    	path?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(100) 
    })
    	fileName?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(100) 
    })
    	fileExtension?: string;

    @Column({
    	field: "Size",
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	size?: number;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(100) 
    })
    	originalName?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(100) 
    })
    	mimetype?: string;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	doneYn?: number;

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