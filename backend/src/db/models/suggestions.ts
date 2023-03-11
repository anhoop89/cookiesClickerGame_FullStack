/** @module Models/suggestions */
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	Relation,
	UpdateDateColumn
} from "typeorm";


/**
 *  Class representing suggestions table
 */
@Entity({name: "suggestions"})
export class Suggestions extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('text')
	name: string;

	@Column('text')
	email: string;

	@Column('text')
	comments: string; 

	@CreateDateColumn()
	created_at: string;

}
