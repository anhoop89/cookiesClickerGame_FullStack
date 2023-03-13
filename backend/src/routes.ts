/** @module Routes */
import cors from "cors";
import {
	FastifyInstance,
	FastifyReply,
	FastifyRequest,
	RouteShorthandOptions,
} from "fastify";
import { User } from "./db/models/user";
import { IPHistory } from "./db/models/ip_history";
import { ILike, LessThan, Not } from "typeorm";
import { GameData } from "./db/models/game_data";
import { Suggestions } from "./db/models/suggestions";

/**
 * App plugin where we construct our routes
 * @param {FastifyInstance} app our main Fastify app instance
 */
export async function clickers_routes(app: FastifyInstance): Promise<void> {
	// Middleware
	// TODO: Refactor this in favor of fastify-cors

	// Enable CORS for all routes
	app.use(cors());

	//https://expressjs.com/en/resources/middleware/cors.html
	// Handle CORS preflight requests
	app.options("/*", async (req: FastifyRequest, reply: FastifyReply) => {
		reply
			.header("Access-Control-Allow-Origin", "*")
			.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			.header(
				"Access-Control-Allow-Headers",
				"Content-Type, Authorization, X-Requested-With"
			)
			.send("preflight requests");
	});
	/**
   * Route replying to /test path for test-testing
   * @name get/test
   * @function
   */

	app.options("/users", async (req: any, res) => {
		// Set response headers to allow cross-origin requests
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Methods", "GET, POST");
		res.header("Access-Control-Allow-Headers", "Content-Type");

		// Send empty response with 200 status code
		res.status(200).send();
	});

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
				type: "object",
				properties: {
					name: { type: "string" },
					email: { type: "string" },
				},
			},
			response: {
				200: {
					type: "object",
					properties: {
						user: { type: "object" },
						ip_address: { type: "string" },
					},
				},
			},
		},
	};

	/**
   * Route allowing creation of a new user.
   * @name post/users
   * @function
   * @param {string} name - user's full name
   * @param {string} email - user's email address
   * @returns {IPostUsersResponse} user and IP Address used to create account
   */

	app.post<{
    Body: IPostUsersBody;
    Reply: IPostUsersResponse;
  }>("/users", async (req: any, reply: FastifyReply) => {
  	const { name, email, userClicks, userUpgradeOne, userUpgradeTwo } = req.body;

	  // Check if there is already a user with the same name or email
	  const existingUsername = await app.db.user.findOne({
  		where: {
		  name: name,
		  deleted_at: undefined
  		}
	  });
	  // make sure a new user can't have the same username or email!
	  const existingEmail= await app.db.user.findOne({
  		where: {
  			email : email,
  			deleted_at: undefined
  		}
  	});

  	// auth0 will handle an user picking an exisiting username or email 
  	// so we don't have to worry about that case. 
  	// reply.send("testing username:   " + existingUsername);
  	if (existingUsername !== null || existingEmail !== null) {		
  		reply.status(200).send("The user already exists in the database!");
  		return;
  	}

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
  	await reply.status(200).send(JSON.stringify({ user, ip_address: ip.ip }));
  });

	// sending a username, the frontend will receive the game data related to that specific user
	app.get("/user/:username", async (req: any, reply: FastifyReply) => {
		let givenName = req.params.username;
		let { currentUser } = { currentUser: givenName };

		// find the specific user given
		let theUser = await app.db.user.find({
			where: {
				name: currentUser,
			},
			relations: ["gameDataEntry"],
		});

		// error checking to ensure a proper usename has been given
		if (theUser === undefined) {
			reply.send("Incorrect Username Given.");
			return;
		}

		// return game data related to specific user
		reply.send(theUser);
	});

	// soft deleting a user given a specific username
	app.delete("/user/:username", (req: any, reply) => {
		let givenName = req.params.username;
		let { currentUser } = { currentUser: givenName };

		app.db.user
			.find({
				relations: {
					gameDataEntry: true,
				},
				where: {
					name: currentUser,
				},
			})
			.then((theUser) => {
				if (theUser === undefined) {
					reply.send("Incorrect Username Given.");
					return;
				}

				return app.db.user.softRemove(theUser).then(() => {
					// Set the Access-Control-Allow-Origin header
					reply.header("Access-Control-Allow-Origin", "http://localhost:5173");
					reply.send("User Deleted.");
				});
			})
			.catch((err) => {
				reply.send(err);
			});
	});

	// put request to update game information for a specific user
	// NOTE: the 'errors' showing up in this function do not affect the product so far.
	//		upon testing various times, the code works as intended and no errors have been thrown
	app.put("/user", async (req: any, reply) => {
		const { name, userClicks, userUpgradeOne, userUpgradeTwo } = req.body;

		let { currentUser } = { currentUser: name };

		let theUser = await app.db.user.findOneOrFail({
			relations: {
				gameDataEntry: true,
			},
			where: {
				name: currentUser,
			},
		});

		if (theUser === undefined) {
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

	// CRUD impl for users
	// Create new user

	// Appease fastify gods
	const post_suggestions_opts: RouteShorthandOptions = {
		schema: {
			body: {
				type: "object",
				properties: {
					name: { type: "string" },
					email: { type: "string" },
					comments: { type: "string" },
				},
			},
			response: {
				200: {
					type: "object",
					properties: {
						suggestion: { type: "object" },
					},
				},
			},
		},
	};

	// SUGGESTIONS Routes
	app.get(
		"/suggestions",
		async (request: FastifyRequest, reply: FastifyReply) => {
			let allSuggestions = await app.db.suggestions.find();
			reply.send(allSuggestions);
		}
	);

	app.post<{
    Body: IPostSuggestionsBody;
    Reply: IPostSuggestionsResponse;
  }>(
  	"/suggestions",
  	post_suggestions_opts,
  	async (req: any, reply: FastifyReply) => {
  		const { name, email, comments } = req.body;

  		const newSuggestion = new Suggestions();
  		newSuggestion.name = name;
  		newSuggestion.email = email;
  		newSuggestion.comments = comments;
  		await newSuggestion.save();

  		await reply.send(JSON.stringify({ newSuggestion }));
  	}
  );
}

// Appease typescript request gods
interface IPostUsersBody {
  name: string;
  email: string;
}

/**
 * Response type for post/users
 */
export type IPostUsersResponse = {
  /**
   * User created by request
   */
  user: User;
  /**
   * IP Address user used to create account
   */
  ip_address: string;
};

interface IPostSuggestionsBody {
  name: string;
  email: string;
  comments: string;
}

/**
 * Response type for post/users
 */
export type IPostSuggestionsResponse = {
  /**
   * User created by request
   */
  suggestion: Suggestions;
};
