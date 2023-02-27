import { Request } from "express";
import { Strategy as GitHubStrategy } from "passport-github2";
import { PassportStrategy } from "../../interfaces/index";
import { getUserById, addGitHubUser } from "../../controllers/userController";
import { GithubProfile } from "../../interfaces/GithubProfile";
import { User } from "../../interfaces/User";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID as string;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET as string;

const githubStrategy: GitHubStrategy = new GitHubStrategy(
	{
		clientID: GITHUB_CLIENT_ID,
		clientSecret: GITHUB_CLIENT_SECRET,
		callbackURL: "http://localhost:8000/auth/github/callback",
		passReqToCallback: true,
	},

	/* ✅ Done */
	async (
		req: Request,
		accessToken: string,
		refreshToken: string,
		profile: GithubProfile,
		done: (err?: Error | null, user?: User) => void
	): Promise<void> => {
		const { id, displayName } = profile;
		let user = getUserById(parseInt(id));
		if (user) {
			done(null, user);
		} else {
			let user = addGitHubUser(displayName);
			done(null, user);
		}
	}
);

const passportGitHubStrategy: PassportStrategy = {
	name: "github",
	strategy: githubStrategy,
};

export default passportGitHubStrategy;
