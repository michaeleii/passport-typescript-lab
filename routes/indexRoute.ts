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
	const getAllSessionIDs = (): Promise<any> => {
		return new Promise((resolve, reject) => {
			store.all?.((err, sessions) => {
				if (err) {
					reject(err);
				} else {
					if (sessions) {
						resolve(sessions);
					}
				}
			});
		});
	};
	const sessionData = await getAllSessionIDs();
	const sids = Object.keys(sessionData);
	const sessions = sids.map((sid: string) => {
		return {
			sid,
			user_id: sessionData[sid].passport.user,
		};
	});
	res.render("adminDashboard", { user: req.user, sessions });
});

export default router;
