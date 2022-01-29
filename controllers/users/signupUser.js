const { Conflict } = require("http-errors");

const { User } = require("../../models");
const createAndSaveToken = require("../../services/createAndSaveToken");

const signupUser = async (req, res) => {
	const { name, email, password, subscription } = req.body;
	const user = await User.findOne({ email });

	if (user) {
		throw new Conflict(`Email ${email} in use`);
	}

	const newUser = new User({ name, email, subscription });
	newUser.setPassword(password);
	newUser.save();

	const token = await createAndSaveToken(newUser._id);

	res.status(201).json({
		status: "success",
		code: 201,
		data: { user: { name, email, subscription }, token },
	});
};

module.exports = signupUser;
