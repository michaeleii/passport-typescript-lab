import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
	getUserByEmailIdAndPassword,
	getUserById,
} from "../../controllers/userController";
import { PassportStrategy } from "../../interfaces/index";

const localStrategy = new LocalStrategy(
	{
		usernameField: "email",
		passwordField: "password",
	},
	(email, password, done) => {
		try {
			const user = getUserByEmailIdAndPassword(email, password);
			done(null, user);
		} catch (error: any) {
			done(null, false, error);
		}
	}
);

/*
 ✅ Done
*/
passport.serializeUser(function (
	user: Express.User,
	done: (err: any, id?: number) => void
) {
	done(null, user.id);
});

/*
 ✅ Done
*/
passport.deserializeUser(function (
	id: number,
	done: (err: any, user?: false | Express.User | null | undefined) => void
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
