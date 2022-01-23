const { Schema, model } = require("mongoose");
const Joi = require("joi");

const phonePattern =
	/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const contactSchema = Schema(
	{
		name: {
			type: String,
			minlength: 2,
			maxlength: 30,
			required: [true, "Set name for contact"],
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			match: phonePattern,
			required: true,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
	},
	{ versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

const joiContactSchema = Joi.object({
	name: Joi.string().min(2).max(30).required(),
	email: Joi.string().email().required(),
	phone: Joi.string().pattern(phonePattern).required(),
	favorite: Joi.bool(),
});

const favContactSchema = Joi.object({ favorite: Joi.bool().required() });

module.exports = { Contact, joiContactSchema, favContactSchema };
