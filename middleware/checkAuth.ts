import { Request, Response, NextFunction } from "express";

/*
DONE
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
DONE
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
