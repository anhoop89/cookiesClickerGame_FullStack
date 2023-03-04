/** @module Models/GameData */
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
 * GameData model - This is for interacting with the 'gamedata' table
 * Each game data entry corresponds to exactly 1 game instance owned by a single User.
 * This means only one user can have a single game entry account
 */
@Entity()
export class GameData extends BaseEntity {
	@PrimaryGeneratedColumn()
	gameId: number;

	@Column()
	num_of_clicks: number;

	@Column()
	num_of_upgrade_one: number;

	@Column()
	num_of_upgrade_two: number;

	@OneToOne((type) => User, (user: User) => user.gameDataEntry)
	user: Relation<User>;

	@CreateDateColumn()
	created_at: string;

	@UpdateDateColumn()
	updated_at: string;
}
