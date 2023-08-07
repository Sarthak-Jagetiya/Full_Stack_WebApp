const express = require("express");
const languageController = require("./../controllers/languageController");

const router = express.Router();

router.route("/toplanguage").get(languageController.topSpoken);
router.route("/leastlanguage").get(languageController.leastSpoken);

router
  .route("/")
  .get(languageController.getAllLanguages)
  .post(languageController.createLanguage);

router
  .route("/:id")
  .get(languageController.getLanguage)
  .patch(languageController.updateLanguage)
  .delete(languageController.deleteLanguage);

module.exports = router;
