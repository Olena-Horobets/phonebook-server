const { NotFound } = require("http-errors");

const { User } = require("../../models");
const { Contact } = require("../../models");

const removeUser = async (req, res) => {
	const { userId } = req.params;

	const user = await User.findByIdAndRemove(userId);

	if (!user) {
		throw NotFound(`User with id "${userId}" did not found`);
	}

	const contacts = await Contact.find({ owner: userId });

	contacts.forEach(async (el) => {
		await Contact.findByIdAndRemove(el._id);
	});

	res.status(200).json({
		status: "success",
		code: 200,
		message: "user deleted",
	});
};

module.exports = removeUser;
