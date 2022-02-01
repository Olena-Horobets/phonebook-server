const { NotFound } = require("http-errors");

const { Contact } = require("../../models");

const updateContact = async (req, res) => {
	const { body } = req;

	const { contactId } = req.params;
	const contact = await Contact.findByIdAndUpdate(contactId, body, {
		new: true,
	});

	if (!contact) {
		throw NotFound(`Contact  with id "${contactId}" did not found`);
	}

	res.status(200).json({ status: "success", code: 200, data: contact });
};

module.exports = updateContact;
