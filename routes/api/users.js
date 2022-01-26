const express = require("express");

const { ctrlWrapper, validation } = require("../../middlewares");
const ctrl = require("../../controllers/users/index");

const { joiUserSchema } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(joiUserSchema), ctrlWrapper(ctrl.signupUser));

router.post("/login", validation(joiUserSchema), ctrlWrapper(ctrl.loginUser));

router.post("/logout");

module.exports = router;
