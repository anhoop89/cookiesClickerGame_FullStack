/** @module Models/IPHistory */
import {User} from "./user";
import TypeORM from "typeorm";
/**
 * IPHistory model - holds all IPs a user has logged in with
 */
@TypeORM.Entity()
export class IPHistory extends TypeORM.BaseEntity {
	@TypeORM.PrimaryGeneratedColumn()
	id: string;

	@TypeORM.Column("text")
	ip: string;

	@TypeORM.ManyToOne((type) => User, (user: User) => user.ips, {
		//adding an IPHistory will also add associated User if it is new, somewhat useless in this example
		cascade: true,
		// if we delete a User, also delete their IP History
		onDelete: "CASCADE"
	})
	user: TypeORM.Relation<User>;

	@TypeORM.CreateDateColumn()
	created_at: string;
}
