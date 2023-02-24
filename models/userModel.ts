import { User } from "../interfaces/User";

const database: User[] = [
	{
		id: 1,
		name: "Jimmy Smith",
		email: "jimmy123@gmail.com",
		password: "jimmy123!",
		role: "user",
	},
	{
		id: 2,
		name: "Johnny Doe",
		email: "johnny123@gmail.com",
		password: "johnny123!",
		role: "user",
	},
	{
		id: 3,
		name: "Jonathan Chen",
		email: "jonathan123@gmail.com",
		password: "jonathan123!",
		role: "user",
	},
	{
		id: 4,
		name: "Michael Lei",
		email: "mlei6@my.bcit.ca",
		password: "michael123!",
		role: "admin",
	},
];

const userModel = {
	/* ✅ Done */
	findOne: (email: string) => {
		const user = database.find((user) => user.email === email);
		if (user) {
			return user;
		}
		throw new Error(`Couldn't find user with email: ${email}`);
	},
	/* ✅ Done */
	findById: (id: number) => {
		const user = database.find((user) => user.id === id);
		if (user) {
			return user;
		}
		return null;
	},
	addUser(user: User) {
		database.push(user);
		return user;
	},
};

export { database, userModel };
