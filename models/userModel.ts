const database = [
	{
		id: 1,
		name: "Jimmy Smith",
		email: "jimmy123@gmail.com",
		password: "jimmy123!",
	},
	{
		id: 2,
		name: "Johnny Doe",
		email: "johnny123@gmail.com",
		password: "johnny123!",
	},
	{
		id: 3,
		name: "Jonathan Chen",
		email: "jonathan123@gmail.com",
		password: "jonathan123!",
	},
	{
		id: 4,
		name: "Scott Chen",
		email: "schen@email.com",
		password: "12345",
	},
	{
		id: 5,
		name: "Jerry Fan",
		email: "jfan@email.com",
		password: "1231231231345",
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
		throw new Error(`Couldn't find user with id: ${id}`);
	},
};

export { database, userModel };
