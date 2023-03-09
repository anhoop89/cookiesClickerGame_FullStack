/** @module Seeds/GameSeeder */

import {faker} from "@faker-js/faker";
import {Seeder} from "../../lib/seed_manager";
import {GameData} from "../models/game_data";
import {User} from "../models/user";
import {FastifyInstance} from "fastify";

// note here that using faker makes testing a bit...hard
// We can set a particular seed for faker, then use it later in our testing!
faker.seed(100);

/**
 * Seeds the gamedata table
 */
export class GameDataSeeder extends Seeder {

	/**
	 * Runs the GameData table's seed
	 * @function
	 * @param {FastifyInstance} app
	 * @returns {Promise<void>}
	 */
	override async run(app: FastifyInstance) {
		app.log.info("Seeding Game Data...");
		// Remove everything in there currently
		await app.db.gameData.delete({});
		// get our users and make each a few IPs
		const users = await User.find();

		for (let i = 0; i < users.length; i++) {
			let newData = new GameData();
			newData.user = users[i];
			newData.num_of_clicks = 0;
			newData.num_of_upgrade_one = 0;
			newData.num_of_upgrade_two = 0;
			await newData.save();
			app.log.info("Finished seeding game data: " + i);
		}
	}
}

export const GameDataSeed = new GameDataSeeder();

 
