const { Contact } = require("../../models");

const getContactsList = async (req, res) => {
	const { _id } = req.user;

	let { page = 1, limit = 10, favourite } = req.query;
	limit = parseInt(limit > 10 ? 10 : limit);
	const skip = (page - 1) * limit;

	if (favourite) {
		const contacts = await Contact.find({ owner: _id, favourite }, "", {
			skip,
			limit,
		}).populate("owner", "_id name email");

		res.status(200).json({
			status: "success",
			code: 200,
			data: { contacts, page, limit, query: { favourite } },
		});
	} else {
		const contacts = await Contact.find({ owner: _id }, "", {
			skip,
			limit,
		}).populate("owner", "_id name email");

		res
			.status(200)
			.json({ status: "success", code: 200, data: { contacts, page, limit } });
	}
};

module.exports = getContactsList;
