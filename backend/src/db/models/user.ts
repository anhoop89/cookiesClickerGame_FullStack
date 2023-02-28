/** @module Models/User */
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	Relation,
	UpdateDateColumn
} from "typeorm";

import {IPHistory} from "./ip_history";
import {Profile} from "./profile";

/**
 *  Class representing user table
 */
@Entity({name: "users"})
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		length: 100,
		type: "varchar"
	})
	name: string;

	@Column('text')
	email: string;

	// IPHistory
	@OneToMany((type) => IPHistory, (ip: IPHistory) => ip.user)
	ips: Relation<IPHistory[]>;

	// Profile
	@OneToMany((type) => Profile, (p: Profile) => p.user)
	profiles: Relation<Profile[]>;

	@CreateDateColumn()
	created_at: string;

	@UpdateDateColumn()
	updated_at: string;
}
