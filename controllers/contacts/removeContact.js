const createError = require("http-errors");

const { Contact } = require("../../models");

const removeContact = async (req, res) => {
	const { contactId } = req.params;
	const contact = await Contact.findByIdAndRemove(contactId);

	if (!contact) {
		throw createError(404, `Contact  with id "${contactId}" did not found`);
	}

	res.status(200).json({
		status: "success",
		code: 200,
		message: "contact deleted",
	});
};

module.exports = removeContact;
