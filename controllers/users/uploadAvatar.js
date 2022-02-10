const fs = require("fs/promises");
const path = require("path");
const { BadRequest } = require("http-errors");

const { User } = require("../../models");

const uploadAvatar = async (req, res) => {
	const { _id } = req.user;

	if (!req.file) throw new BadRequest("Avatar file is required");
	const { path: tempUpload, filename } = req.file;

	try {
		const [extention] = filename.split(".").reverse();
		const newFileName = `${_id}.${extention}`;
		const productsDir = path.join(__dirname, "../../", "public", "avatars");
		const resultUpload = path.join(productsDir, newFileName);
		const avatarURL = path.join("avatars", newFileName);

		await fs.rename(tempUpload, resultUpload);
		await User.findByIdAndUpdate(_id, { avatarURL });

		res.status(200).json({
			status: "success",
			code: 200,
			avatarURL,
		});
	} catch (err) {
		await fs.unlink(tempUpload);
	}
};

module.exports = uploadAvatar;
