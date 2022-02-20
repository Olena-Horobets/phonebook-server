const express = require("express");

const {
	ctrlWrapper,
	validation,
	validateToken,
	upload,
} = require("../../middlewares");
const ctrl = require("../../controllers/users/index");
const {
	joiUserSchema,
	joiSubscriptionSchema,
	joiVerifyEmailSchema,
} = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(joiUserSchema), ctrlWrapper(ctrl.signupUser));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyUser));

router.get(
	"/verify",
	validation(joiVerifyEmailSchema),
	ctrlWrapper(ctrl.reVerifyUser)
);

router.post("/login", validation(joiUserSchema), ctrlWrapper(ctrl.loginUser));

router.get("/current", validateToken, ctrlWrapper(ctrl.currentUser));

router.patch(
	"/subscription",
	validateToken,
	validation(joiSubscriptionSchema),
	ctrlWrapper(ctrl.updateSubscription)
);

router.patch(
	"/avatars",
	validateToken,
	upload.single("avatar"),
	ctrlWrapper(ctrl.uploadAvatar)
);

router.delete("/avatars", validateToken, ctrlWrapper(ctrl.removeAvatar));

router.get("/logout", validateToken, ctrlWrapper(ctrl.logoutUser));

router.delete("/:userId/remove", validateToken, ctrlWrapper(ctrl.removeUser));

module.exports = router;
