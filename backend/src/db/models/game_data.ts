/** @module Models/GameData */

import TypeORM from "typeorm";
import {User} from "./user";

/**
 * GameData model - This is for interacting with the 'gamedata' table
 * Each game data entry corresponds to exactly 1 game instance owned by a single User.
 * This means only one user can have a single game entry account
 */
@TypeORM.Entity()
export class GameData extends TypeORM.BaseEntity {
	@TypeORM.PrimaryGeneratedColumn()
	gameId: number;

	@TypeORM.Column()
	num_of_clicks: number;

	@TypeORM.Column()
	num_of_upgrade_one: number;

	@TypeORM.Column()
	num_of_upgrade_two: number;

	@TypeORM.OneToOne((type) => User, (user: User) => user.gameDataEntry)
	user: TypeORM.Relation<User>;

	@TypeORM.CreateDateColumn({select: false})
	created_at: string;

	@TypeORM.UpdateDateColumn({select: false})
	updated_at: string;
}
