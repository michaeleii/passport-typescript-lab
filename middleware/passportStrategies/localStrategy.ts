import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
	getUserByEmailIdAndPassword,
	getUserById,
} from "../../controllers/userController";
import { PassportStrategy } from "../../interfaces/index";
import { User } from "../../interfaces/User";

const localStrategy = new LocalStrategy(
	{
		usernameField: "email",
		passwordField: "password",
	},
	(email, password, done) => {
		try {
			const user = getUserByEmailIdAndPassword(email, password);
			return done(null, user ? user : false);
		} catch (error: any) {
			return done(null, false, error);
		}
	}
);

/*
 ✅ Done
*/
passport.serializeUser(function (
	user: User,
	done: (err: null, id?: number) => void
) {
	done(null, user.id);
});

/*
 ✅ Done
*/
passport.deserializeUser(function (
	id: number,
	done: (err: { message: string } | null, user: User | null) => void
) {
	let user = getUserById(id);
	if (user) {
		done(null, user);
	} else {
		done({ message: "User not found" }, null);
	}
});

const passportLocalStrategy: PassportStrategy = {
	name: "local",
	strategy: localStrategy,
};

export default passportLocalStrategy;
