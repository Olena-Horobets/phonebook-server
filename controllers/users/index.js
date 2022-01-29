const signupUser = require("./signupUser");
const loginUser = require("./loginUser");
const currentUser = require("./getCurrentUser");
const logoutUser = require("./logoutUser");

const ctrl = {
	signupUser,
	loginUser,
	currentUser,
	logoutUser,
};

module.exports = ctrl;
