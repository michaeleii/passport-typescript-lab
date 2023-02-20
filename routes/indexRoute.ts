import express from "express";
import { SessionData } from "express-session";
import { session } from "passport";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";

router.get("/", (req, res) => {
	res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
	res.render("dashboard", {
		user: req.user,
	});
});

router.get("/admin", ensureAuthenticated, async (req, res) => {
	const store = req.sessionStore;
	const getAllSessionIDs = (): Promise<string[]> => {
		return new Promise((resolve, reject) => {
			store.all?.((err, sessions) => {
				if (err) {
					reject(err);
				} else {
					if (sessions) {
						resolve(Object.keys(sessions));
					}
				}
			});
		});
	};
	const sids: string[] = await getAllSessionIDs();
	const sessions = sids.map((sid) => {
		return {
			sid,
			user_id: 1,
		};
	});
	console.log(sessions);

	res.render("adminDashboard", { user: req.user, sessions });
});

export default router;
