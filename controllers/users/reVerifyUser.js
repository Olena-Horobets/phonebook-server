const { BadRequest } = require("http-errors");

const { User } = require("../../models");
const createAndSaveToken = require("../../services/createAndSaveToken");
const sendEmail = require("../../services/sendEmail");

const reVerifyUser = async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });

	if (!user) throw BadRequest("User not found");
	if (user.verified) throw BadRequest("Verification has already been passed");

	const msg = {
		to: email,
		subject: "Confirm your registration in the Phonebook App",
		html: `
		<p>We are glad to see you register in the Phonebook App. Confirm your registration by clicking on
			<a href='http://localhost:3000/api/users/verify/${user.verificationToken}' target='_blank'>this link</a>
		</p>`,
	};

	await sendEmail(msg);

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

module.exports = reVerifyUser;
