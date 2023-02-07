import express from "express";
import passport from "passport";
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => {
	res.render("login", { error: false });
});

router.post("/login", (req, res) => {
	passport.authenticate(
		"local",

		(err, user, info) => {
			if (user) {
				req.login(user, function (err) {
					if (err) {
						console.log("Error", err);
					}
					return res.redirect("/dashboard");
				});
			} else {
				res.render("login", { error: true });
			}
		}
	)(req, res);
});

router.get("/logout", (req, res) => {
	req.logout((err) => {
		if (err) console.log(err);
	});
	res.redirect("/auth/login");
});

export default router;
