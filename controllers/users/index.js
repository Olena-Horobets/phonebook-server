const signupUser = require("./signupUser");
const loginUser = require("./loginUser");
const currentUser = require("./getCurrentUser");
const updateSubscription = require("./updateSubscription");
const logoutUser = require("./logoutUser");
const removeUser = require("./removeUser");

const ctrl = {
	signupUser,
	loginUser,
	currentUser,
	updateSubscription,
	logoutUser,
	removeUser,
};

module.exports = ctrl;
