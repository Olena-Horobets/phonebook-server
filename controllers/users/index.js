const signupUser = require("./signupUser");
const verifyUser = require("./verifyUser");
const reVerifyUser = require("./reVerifyUser");
const loginUser = require("./loginUser");
const currentUser = require("./getCurrentUser");
const updateSubscription = require("./updateSubscription");
const uploadAvatar = require("./uploadAvatar");
const removeAvatar = require("./removeAvatar");
const logoutUser = require("./logoutUser");
const removeUser = require("./removeUser");

const ctrl = {
	signupUser,
	verifyUser,
	reVerifyUser,
	loginUser,
	currentUser,
	updateSubscription,
	uploadAvatar,
	removeAvatar,
	logoutUser,
	removeUser,
};

module.exports = ctrl;
