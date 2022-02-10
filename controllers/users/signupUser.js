const { Conflict } = require("http-errors");
const gravatar = require("gravatar");

const { User } = require("../../models");
const createAndSaveToken = require("../../services/createAndSaveToken");

const signupUser = async (req, res) => {
	const { name, email, password, subscription } = req.body;
	const user = await User.findOne({ email });

	if (user) {
		throw new Conflict(`Email ${email} in use`);
	}

	const avatarURL = gravatar.url(email);
	const newUser = await new User({ name, email, subscription, avatarURL });
	await newUser.setPassword(password);
	await newUser.save();

	const token = await createAndSaveToken(newUser._id);

	res.status(201).json({
		status: "success",
		code: 201,
		data: {
			user: {
				name: newUser.name,
				email: newUser.email,
				subscription: newUser.subscription,
			},
			token,
		},
	});
};

module.exports = signupUser;
