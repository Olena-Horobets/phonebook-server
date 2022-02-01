const { NotFound } = require("http-errors");

const { Contact } = require("../../models");

const updateFavContact = async (req, res) => {
	const { favourite } = req.body;
	const { contactId } = req.params;

	const contact = await Contact.findByIdAndUpdate(
		contactId,
		{ favourite },
		{ new: true }
	);

	if (!contact) {
		throw NotFound(`Contact  with id "${contactId}" did not found`);
	}

	res.status(200).json({ status: "success", code: 200, data: contact });
};

module.exports = updateFavContact;
