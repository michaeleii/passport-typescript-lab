import { User } from "../interfaces/User";
import { database, userModel } from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string) => {
	let user = userModel.findOne(email);
	if (user) {
		if (isUserValid(user, password)) {
			return user;
		}
	}
	return null;
};
const getUserById = (id: number) => {
	let user = userModel.findById(id);
	if (user) {
		return user;
	}
	return null;
};

const addGitHubUser = (displayName: string) => {
	const user = userModel.addUser({
		id: database.length + 1,
		name: displayName,
		role: "user",
	});
	return user;
};

function isUserValid(user: User, password: string) {
	if (user.password === password) {
		return true;
	} else {
		throw new Error("Password is incorrect");
	}
}

export { getUserByEmailIdAndPassword, getUserById, addGitHubUser };
