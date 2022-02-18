const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
	const msg = { ...data, from: "olenahorobets2014@gmail.com" };
	await sgMail
		.send(msg)
		.then(() => console.log("Email sent"))
		.catch((error) => console.error(error.message));

	return true;
};

module.exports = sendEmail;
