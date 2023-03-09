/** @module Routes */
import cors from "cors";
import {FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import {User} from "./db/models/user";
import {IPHistory} from "./db/models/ip_history";
import {Profile} from "./db/models/profile";
import {ILike, LessThan, Not} from "typeorm";
import { GameData } from "./db/models/game_data";

/**
 * App plugin where we construct our routes
 * @param {FastifyInstance} app our main Fastify app instance
 */
export async function clickers_routes(app: FastifyInstance): Promise<void> {

	// Middleware
	// TODO: Refactor this in favor of fastify-cors
	app.use(cors());

	/**
	 * Route replying to /test path for test-testing
	 * @name get/test
	 * @function
	 */
	app.get("/test", async (request: FastifyRequest, reply: FastifyReply) => {
		reply.send("GET Test");
	});

	/**
	 * Route serving login form.
	 * @name get/users
	 * @function
	 */
	app.get("/users", async (request: FastifyRequest, reply: FastifyReply) => {
		// This will return all users along with their associated profiles and ip histories via relations
		// https://typeorm.io/find-options
		let users = await app.db.user.find();
		reply.send(users);
	});

	// CRUD impl for users
	// Create new user

	// Appease fastify gods
	const post_users_opts: RouteShorthandOptions = {
		schema: {
			body: {
				type: 'object',
				properties: {
					name: {type: 'string'},
					email: {type: 'string'}
				}
			},
			response: {
				200: {
					type: 'object',
					properties: {
						user: {type: 'object'},
						ip_address: {type: 'string'}
					}
				}
			}
		}
	};

	/**
	 * Route allowing creation of a new user.
	 * @name post/users
	 * @function
	 * @param {string} name - user's full name
	 * @param {string} email - user's email address
	 * @returns {IPostUsersResponse} user and IP Address used to create account
	 */

	app.post("/users", async (req: any, reply: FastifyReply)=> {

		const {name, email, userClicks, userUpgradeOne, userUpgradeTwo} = req.body;

		const user = new User();
		user.name = name;
		user.email = email;

		const ip = new IPHistory();
		ip.ip = req.ip;
		ip.user = user;
		// transactional, transitively saves user to users table as well IFF both succeed
		await ip.save();

		const newData = new GameData();
		newData.user = user;
		newData.num_of_clicks = userClicks;
		newData.num_of_upgrade_one = userUpgradeOne;
		newData.num_of_upgrade_two = userUpgradeTwo;
		await newData.save();

		//manually JSON stringify due to fastify bug with validation
		// https://github.com/fastify/fastify/issues/4017
		await reply.send(JSON.stringify({user, ip_address: ip.ip}));
	});


	// sending a username, the frontend will receive the game data related to that specific user
	app.get("/user/:username", async (req: any, reply: FastifyReply) => {

		let givenName = req.params.username;
		let {currentUser} = {"currentUser":givenName};

		// find the specific user given
		let theUser = await app.db.user.find({		
			where:{
				name: currentUser
			},
			relations:['gameDataEntry','profiles']
		});
		
		// error checking to ensure a proper usename has been given
		if(theUser === undefined){
			reply.send("Incorrect Username Given.");
			return;
		}

		// return game data related to specific user
		reply.send(theUser);
	});


	// soft deleting a user given a specific username
	app.delete("/user/:username", async (req: any, reply: FastifyReply) => {
		
		let givenName = req.params.username;
		let {currentUser} = {"currentUser":givenName};

		let theUser = await app.db.user.find({
			relations:{
				gameDataEntry: true
			},
			where:{
				name: currentUser
			}
		});

		// error checking to ensure a proper usename has been given
		if(theUser[0] === undefined){
			reply.send("Incorrect Username Given.");
			return;
		}

		let res = await app.db.user.softRemove(theUser);
	
		await reply.send("User Deleted.");
	});


	// put request to update game information for a specific user
	// NOTE: the 'errors' showing up in this function do not affect the product so far.
	//		upon testing various times, the code works as intended and no errors have been thrown
	app.put("/user", async(req: any, reply) => {

		const {name, userClicks, userUpgradeOne, userUpgradeTwo} = req.body;

		let {currentUser} = {"currentUser":name};

		let theUser = await app.db.user.findOneOrFail({
			relations:{
				gameDataEntry: true
			},
			where:{
				name: currentUser
			}
		});

		if(theUser === undefined){
			reply.send("Incorrect Username Given.");
			return;
		}

		// the note is talking about the errors ni the following 5 lines.
		// let updateData = theUser.gameDataEntry;
		// updateData.num_of_clicks = userClicks;
		// updateData.num_of_upgrade_one = userUpgradeOne;
		// updateData.num_of_upgrade_two = userUpgradeTwo;
		// let res = await updateData.save();

		await reply.send("Game Saved!");
	});




	// PROFILE Route
	/**
	 * Route listing all current profiles
	 * @name get/profiles
	 * @function
	 */
	app.get("/profiles", async (req, reply) => {
		let profiles = await app.db.profile.find();
		reply.send(profiles);
	});


	app.post("/profiles", async (req: any, reply: FastifyReply) => {

		const {clicks} = req.body;
		const {upgradeOne} = req.body;
		const {upgradeTwo} = req.body;

		const myUser = await app.db.user.findOneByOrFail({});

	  	const newProfile = new Profile();
	  	newProfile.num_of_clicks = clicks;
		newProfile.num_of_upgrade_one = upgradeOne;
		newProfile.num_of_upgrade_two = upgradeTwo;
		newProfile.user = myUser;

		await newProfile.save();

		//manually JSON stringify due to fastify bug with validation
		// https://github.com/fastify/fastify/issues/4017
		await reply.send(JSON.stringify(newProfile));
	});

	app.delete("/profiles", async (req: any, reply: FastifyReply) => {

		const myProfile = await app.db.profile.findOneByOrFail({});
		let res = await myProfile.remove();

		//manually JSON stringify due to fastify bug with validation
		// https://github.com/fastify/fastify/issues/4017
		await reply.send(JSON.stringify(res));
	});

	app.put("/profiles", async(req: any, reply) => {

		const {clicks} = req.body;
		const myProfile = await app.db.profile.findOneByOrFail({});


		myProfile.num_of_clicks = clicks;
		let res = await myProfile.save();

		//manually JSON stringify due to fastify bug with validation
		// https://github.com/fastify/fastify/issues/4017
		await reply.send(JSON.stringify(res));
	});

}

// Appease typescript request gods
interface IPostUsersBody {
	name: string,
	email: string,
}

/**
 * Response type for post/users
 */
export type IPostUsersResponse = {
	/**
	 * User created by request
	 */
	user: User,
	/**
	 * IP Address user used to create account
	 */
	ip_address: string
}
