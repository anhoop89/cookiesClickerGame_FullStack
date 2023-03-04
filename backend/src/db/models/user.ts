/** @module Models/User */
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

import { SoftDeleteQueryBuilder } from "typeorm/query-builder/SoftDeleteQueryBuilder";
import { GameData } from "./game_data";
import {IPHistory} from "./ip_history";
import {Profile} from "./profile";

/**
 *  Class representing user table
 */
@Entity({name: "users"})
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('text')
	name: string;

	@Column('text')
	email: string;

	// IPHistory
	@OneToMany((type) => IPHistory, (ip: IPHistory) => ip.user)
	ips: Relation<IPHistory[]>;

	// Profile
	@OneToOne((type) => Profile, (p: Profile) => p.user)
	@JoinColumn()
	profiles: Relation<Profile[]>;

	
	// GameData
	@OneToOne((type) => GameData, (g: GameData) => g.user)
	@JoinColumn()
	gameDataEntry: Relation<GameData[]>;
	

	@CreateDateColumn()
	created_at: string;

	@UpdateDateColumn()
	updated_at: string;

	// for soft deletion
	@DeleteDateColumn({select: false})
	deleted_at?: string;
}
