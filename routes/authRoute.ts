import express from "express";
import passport from "passport";
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => {
	res.render("login", { error: false });
});

router.post(
	"/login",
	passport.authenticate(
		"local",
		{
			successRedirect: "/dashboard",
			failureRedirect: "/auth/login",
			/* FIX ME: 😭 failureMsg needed when login fails */
		},
		(err, user, options) => {
			console.log(options); // options will be the complete object you pass in done()
		}
	)
);

router.get("/logout", (req, res) => {
	req.logout((err) => {
		if (err) console.log(err);
	});
	res.redirect("/auth/login");
});

export default router;
