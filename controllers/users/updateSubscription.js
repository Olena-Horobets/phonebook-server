const { User } = require("../../models");

const updateSubscription = async (req, res) => {
	const { _id } = req.user;
	const { subscription } = req.body;

	const updatedUser = await User.findByIdAndUpdate(
		_id,
		{ subscription },
		{ new: true }
	);

	console.log(_id, subscription);
	res.status(200).json({
		status: "success",
		code: 200,
		data: {
			user: {
				name: updatedUser.name,
				email: updatedUser.email,
				subscription: updatedUser.subscription,
			},
		},
	});
};

module.exports = updateSubscription;
