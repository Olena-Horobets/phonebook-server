const express = require("express");

const { ctrlWrapper, validation } = require("../../middlewares");
const ctrl = require("../../controllers/contacts/index");

const { joiContactSchema, favContactSchema } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getContactsList));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validation(joiContactSchema), ctrlWrapper(ctrl.addContact));

router.put(
	"/:contactId",
	validation(joiContactSchema),
	ctrlWrapper(ctrl.updateContact)
);

router.patch(
	"/:contactId/favorite",
	validation(favContactSchema),
	ctrlWrapper(ctrl.updateFavContact)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

module.exports = router;
