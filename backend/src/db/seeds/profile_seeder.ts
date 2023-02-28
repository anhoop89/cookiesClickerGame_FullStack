/** @module Seeds/Profile */

import {faker} from "@faker-js/faker";
import {Seeder} from "../../lib/seed_manager";
import {Profile} from "../models/profile";
import {User} from "../models/user";
import {FastifyInstance} from "fastify";

// note here that using faker makes testing a bit...hard
// We can set a particular seed for faker, then use it later in our testing!
faker.seed(100);

/**
 * Seeds the ip_history table
 */
export class ProfileSeeder extends Seeder {

	/**
	 * Runs the Profile table's seed
	 * @function
	 * @param {FastifyInstance} app
	 * @returns {Promise<void>}
	 */
	override async run(app: FastifyInstance) {
		app.log.info("Seeding IP Histories...");
		// Remove everything in there currently
		await app.db.profile.delete({});
		// get our users and make each a few IPs
		const users = await User.find();

		for (let i = 0; i < users.length; i++) {
			let newProfile = new Profile();
			newProfile.user = users[i];
			newProfile.name = "Spot";
			// Todo: Get rid of placeholder hard coded image link
			newProfile.picture = "http://placeholder.com/mypic.jpeg";
			await newProfile.save();
			app.log.info("Finished seeding user: " + i);
		}
	}
}

export const ProfileSeed = new ProfileSeeder();

 
