import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
	getUserByEmailIdAndPassword,
	getUserById,
} from "../../controllers/userController";
import { PassportStrategy } from "../../interfaces/index";

const localStrategy = new LocalStrategy(
	{
		usernameField: "email", //Passes req.body.email into the callback, by default it is req.body.username
		passwordField: "password",
	},
	(email, password, done) => {
		const user = getUserByEmailIdAndPassword(email, password);
		return user
			? done(null, user)
			: done(null, false, {
					message: "Your login details are not valid. Please try again",
			  });
	}
);

//Create a session for the user
//This function is called when the user is authenticated
//The user id is stored in the session
//req.user = user
passport.serializeUser(function (
	user: Express.User,
	done: (err: any, id: number) => void
) {
	done(null, user.id);
});

passport.deserializeUser(function (
	id: number,
	done: (err: any, user: Express.User | null) => void
) {
	let user = getUserById(id);
	if (user) {
		done(null, user);
	} else {
		done({ error: "User not found" }, null);
	}
});

const passportLocalStrategy: PassportStrategy = {
	name: "local",
	strategy: localStrategy,
};

export default passportLocalStrategy;
