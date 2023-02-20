import { Request, Response, NextFunction } from "express";

/*
✅ Done
*/
export const ensureAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/auth/login");
};

/*
✅ Done
*/
export const forwardAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.isAuthenticated()) {
		return next();
	}
	res.redirect("/dashboard");
};

export const ensureAdmin = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.user && req.user.role === "admin") {
		return next();
	}
	res.redirect("/dashboard");
};
