const { BadRequest } = require("http-errors");

const { User } = require("../../models");
const createAndSaveToken = require("../../services/createAndSaveToken");

const verifyUser = async (req, res) => {
	const { verificationToken } = req.params;
	const user = await User.findOne({ verificationToken });

	if (!user) throw BadRequest("User not found");

	const token = await createAndSaveToken(user._id);
	await User.findByIdAndUpdate(user._id, {
		verified: true,
		verificationToken: "",
		token,
	});

	res.status(200).json({
		status: "success",
		code: 200,
		message: "Verification successful",
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

module.exports = verifyUser;
