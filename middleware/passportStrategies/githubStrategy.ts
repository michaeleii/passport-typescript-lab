import { Request } from "express";
import { Strategy as GitHubStrategy } from "passport-github2";
import { PassportStrategy } from "../../interfaces/index";
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

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
		profile: any,
		done: (err?: Error | null, profile?: any) => void
	) => {
		console.log(req);
	}
);

const passportGitHubStrategy: PassportStrategy = {
	name: "github",
	strategy: githubStrategy,
};

export default passportGitHubStrategy;
