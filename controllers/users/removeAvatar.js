const fs = require("fs/promises");
const path = require("path");
const gravatar = require("gravatar");
const { NotFound } = require("http-errors");

const { User } = require("../../models");

const removeAvatar = async (req, res) => {
	const { _id, avatarURL, email } = req.user;

	if (avatarURL.split(".")[0].endsWith(_id)) {
		const filePath = path.join(__dirname, "../../", "public", avatarURL);
		const newAvatarURL = gravatar.url(email);

		await fs.unlink(filePath);
		await User.findByIdAndUpdate(_id, { avatarURL: newAvatarURL });

		res.status(200).json({
			status: "success",
			code: 200,
			avatarURL: newAvatarURL,
		});
	} else {
		throw new NotFound("You are already using default avatar");
	}
};

module.exports = removeAvatar;
