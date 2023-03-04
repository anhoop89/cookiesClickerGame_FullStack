/** @module Models/Profile */
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity, JoinTable,
	ManyToMany,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	Relation,
	UpdateDateColumn
} from "typeorm";
import {User} from "./user";

/**
 * Profile model - This is for interacting with the profile table
 * Each profile corresponds to exactly 1 pet owned by a User.
 * This allows each user to have many pet profiles without needing to create more accounts
 */
@Entity()
export class Profile extends BaseEntity {
	@PrimaryGeneratedColumn()
	gameId: number;

	@Column()
	num_of_clicks: number;

	@Column()
	num_of_upgrade_one: number;

	@Column()
	num_of_upgrade_two: number;

	@OneToOne((type) => User, (user: User) => user.profiles)
	user: Relation<User>;

	@CreateDateColumn()
	created_at: string;

	@UpdateDateColumn()
	updated_at: string;
}
