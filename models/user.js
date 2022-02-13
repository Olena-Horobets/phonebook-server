const { Schema, model } = require("mongoose");
const Joi = require("joi");

const bcrypt = require("bcrypt");

const userSchema = Schema(
	{
		name: {
			type: String,
			default: "",
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: 6,
		},
		subscription: {
			type: String,
			enum: ["starter", "pro", "business"],
			default: "starter",
		},
		avatarURL: { type: String },
		token: {
			type: String,
			default: null,
		},
	},
	{ versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
	this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.isValidPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

const User = model("user", userSchema);

const joiUserSchema = Joi.object({
	name: Joi.string(),
	email: Joi.string().required(),
	password: Joi.string().min(6).required(),
	subscription: Joi.string().valid("starter", "pro", "business"),
});

const joiSubscriptionSchema = Joi.object({
	subscription: Joi.string().valid("starter", "pro", "business").required(),
});

module.exports = { User, joiUserSchema, joiSubscriptionSchema };
