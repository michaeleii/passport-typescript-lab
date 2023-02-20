import express from "express";
const router = express.Router();
import { ensureAdmin, ensureAuthenticated } from "../middleware/checkAuth";

router.get("/", (req, res) => {
	res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
	res.render("dashboard", {
		user: req.user,
	});
});

router.get("/admin", ensureAuthenticated, ensureAdmin, async (req, res) => {
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
	const sessions = sids
		.filter(
			(sid: string) =>
				sessionData[sid].passport && sessionData[sid].passport.user
		)
		.map((sid: string) => ({
			sid,
			user_id: sessionData[sid].passport.user,
		}));
	res.render("adminDashboard", { user: req.user, sessions });
});

router.post(
	"/session/destroy/:session_id",
	ensureAuthenticated,
	ensureAdmin,
	(req, res) => {
		const sid = req.params.session_id;
		const store = req.sessionStore;
		store.destroy(sid, (err) => {
			if (err) {
				throw new Error(err);
			}
			res.redirect("/admin");
		});
	}
);

export default router;
