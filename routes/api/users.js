const express = require("express");

const { ctrlWrapper, validation, validateToken } = require("../../middlewares");
const ctrl = require("../../controllers/users/index");

const { joiUserSchema } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(joiUserSchema), ctrlWrapper(ctrl.signupUser));

router.post("/login", validation(joiUserSchema), ctrlWrapper(ctrl.loginUser));

router.get("/current", validateToken, ctrlWrapper(ctrl.currentUser));

router.get("/logout", validateToken, ctrlWrapper(ctrl.logoutUser));

module.exports = router;
