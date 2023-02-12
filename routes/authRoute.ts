import express from "express";
import passport from "passport";
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => {
	const { errorMessage } = req.query;
	res.render("login", { errorMessage });
});

router.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/dashboard",
		failureRedirect: "/auth/login",
		failureFlash: "Invalid username or password.",
	})
);

router.get("/logout", (req, res) => {
	req.logout((err) => {
		if (err) console.log(err);
	});
	res.redirect("/auth/login");
});

export default router;
