const signupUser = require("./signup");
const loginUser = require("./login");
const logoutUser = require("./logout");

const ctrl = {
	signupUser,
	loginUser,
	logoutUser,
};

module.exports = ctrl;
