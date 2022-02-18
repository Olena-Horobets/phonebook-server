const { Conflict } = require("http-errors");
const { v4 } = require("uuid");
const gravatar = require("gravatar");

const { User } = require("../../models");
const sendEmail = require("../../services/sendEmail");

const signupUser = async (req, res) => {
	const { name, email, password, subscription } = req.body;
	const user = await User.findOne({ email });

	if (user) {
		throw new Conflict(`Email ${email} in use`);
	}

	const avatarURL = gravatar.url(email);
	const verificationToken = v4();
	const newUser = await new User({
		name,
		email,
		subscription,
		avatarURL,
		verificationToken,
	});
	await newUser.setPassword(password);
	await newUser.save();

	const msg = {
		to: email,
		subject: "Confirm your registration in the Phonebook App",
		html: `
		<p>We are glad to see you register in the Phonebook App. Confirm your registration by clicking on
			<a href='http://localhost:3000/api/users/verify/${verificationToken}' target='_blank'>this link</a>
		</p>`,
	};

	await sendEmail(msg);

	res.status(201).json({
		status: "success",
		code: 201,
		data: {
			user: {
				name: newUser.name,
				email: newUser.email,
				subscription: newUser.subscription,
			},
		},
	});
};

module.exports = signupUser;
