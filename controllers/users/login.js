const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");
const { SECRET_KEY } = process.env;

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (!user || !user.isValidPassword(password)) {
		throw new Unauthorized("email or password is wrong");
	}

	const payload = { id: user._id };
	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

	res.status(200).json({ status: "success", code: 200, data: { token } });
};

module.exports = loginUser;
