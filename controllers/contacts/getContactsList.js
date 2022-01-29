const { Contact } = require("../../models");

const getContactsList = async (req, res) => {
	const { _id } = req.user;

	const { page = 1, limit = 1 } = req.query;
	const skip = (page - 1) * limit;

	const contacts = await Contact.find({ owner: _id }, "", {
		skip,
		limit,
	}).populate("owner", "_id name email");

	res.status(200).json({ status: "success", code: 200, data: contacts });
};

module.exports = getContactsList;
