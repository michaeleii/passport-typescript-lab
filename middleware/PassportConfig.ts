import passport from "passport";

import { PassportStrategy } from "../interfaces";

export default class PassportConfig {
	/*
     ✅ Done
    */
	constructor(strategies: PassportStrategy[]) {
		this.addStrategies(strategies);
	}
	addStrategies(strategies: PassportStrategy[]): void {
		strategies.forEach((passportStrategy: PassportStrategy) => {
			passport.use(passportStrategy.name, passportStrategy.strategy);
		});
	}
}
