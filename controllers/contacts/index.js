const addContact = require("./addContact");
const getContactsList = require("./getContactsList");
const getContactById = require("./getContactById");
const updateContact = require("./updateContact");
const updateFavContact = require("./updateFavContact");
const removeContact = require("./removeContact");

const ctrl = {
	addContact,
	getContactsList,
	getContactById,
	updateContact,
	updateFavContact,
	removeContact,
};

module.exports = ctrl;
