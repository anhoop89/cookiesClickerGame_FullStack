/** @module Models/Profile */
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity, JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	Relation
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
	id: number;

	@Column()
	name: string;

	@Column()
	picture: string;

	@ManyToOne((type) => User, (user: User) => user.profiles, {
		//adding an IPHistory will also add associated User if it is new, somewhat useless in this example
		cascade: true,
		// if we delete a User, also delete their IP History
		onDelete: "CASCADE"
	})
	user: Relation<User>;

	@CreateDateColumn()
	created_at: string;
}

/*
TINDER: you are profile1
when you swipe-right on another profile, say profile2
> Create a new Match row in the Match table and set its matching_profile to our user

if someone else swipes right on YOUR profile, again, profile1
> Create a new match row in the match table and set its matched_Profile to our user

 */
