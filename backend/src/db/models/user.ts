/** @module Models/User */

import TypeORM from "typeorm";
import { SoftDeleteQueryBuilder } from "typeorm/query-builder/SoftDeleteQueryBuilder";
import { GameData } from "./game_data";
import {IPHistory} from "./ip_history";

/**
 *  Class representing user table
 */
@TypeORM.Entity({name: "users"})
export class User extends TypeORM.BaseEntity {
	@TypeORM.PrimaryGeneratedColumn()
	id: number;

	@TypeORM.Column('text')
	name: string;

	@TypeORM.Column('text')
	email: string;

	// IPHistory
	@TypeORM.OneToMany((type) => IPHistory, (ip: IPHistory) => ip.user)
	ips: TypeORM.Relation<IPHistory[]>;

	
	// GameData
	@TypeORM.OneToOne((type) => GameData, (g: GameData) => g.user)
	@TypeORM.JoinColumn()
	gameDataEntry: TypeORM.Relation<GameData>;
	

	@TypeORM.CreateDateColumn()
	created_at: string;

	@TypeORM.UpdateDateColumn()
	updated_at: string;

	// for soft deletion
	@TypeORM.DeleteDateColumn({select: false})
	deleted_at?: string;
}
