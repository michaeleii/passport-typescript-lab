import express from "express";
import passport from "passport";
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

declare module "express-session" {
	interface SessionData {
		messages: string[];
	}
}

router.get("/login", forwardAuthenticated, (req, res) => {
	const errorMessage = req.session.messages ? req.session.messages[0] : false;
	req.session.messages = [];
	res.render("login", { errorMessage });
});

router.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/dashboard",
		failureRedirect: "/auth/login",
		failureMessage: true,
	})
);

router.get(
	"/github",
	passport.authenticate("github", {
		scope: ["user:email"],
	})
);

router.get(
	"/github/callback",
	passport.authenticate("github", {
		successRedirect: "/dashboard",
		failureRedirect: "/login",
		failureMessage: true,
	})
);

router.get("/logout", (req, res) => {
	req.logout((err) => {
		if (err) console.log(err);
	});
	res.redirect("/auth/login");
});

export default router;
