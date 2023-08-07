const express = require("express");
const artFormController = require("./../controllers/artFormController");

const router = express.Router();
router
  .route("/")
  .get(artFormController.getAllArtForms)
  .post(artFormController.createArtForm);

router
  .route("/:id")
  .get(artFormController.getArtForm)
  .patch(artFormController.updateArtForm)
  .delete(artFormController.deleteArtForm);

module.exports = router;
