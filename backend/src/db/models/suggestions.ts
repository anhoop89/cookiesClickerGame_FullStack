/** @module Models/suggestions */

import TypeORM from "typeorm";

/**
 *  Class representing suggestions table
 */
@TypeORM.Entity({name: "suggestions"})
export class Suggestions extends TypeORM.BaseEntity {
	@TypeORM.PrimaryGeneratedColumn()
	id: number;

	@TypeORM.Column('text')
	name: string;

	@TypeORM.Column('text')
	email: string;

	@TypeORM.Column('text')
	comments: string; 

	@TypeORM.CreateDateColumn()
	created_at: string;

}
