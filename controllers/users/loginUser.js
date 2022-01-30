const { Unauthorized } = require("http-errors");

const { User } = require("../../models");
const createAndSaveToken = require("../../services/createAndSaveToken");

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (!user || !user.isValidPassword(password)) {
		throw new Unauthorized("email or password is wrong");
	}

	const token = await createAndSaveToken(user._id);

	res.status(200).json({
		status: "success",
		code: 200,
		data: {
			user: {
				name: user.name,
				email: user.email,
				subscription: user.subscription,
			},
			token,
		},
	});
};

module.exports = loginUser;
