const express = require("express");
const danceFormController = require("./../controllers/danceFormController");

const router = express.Router();
router
  .route("/")
  .get(danceFormController.getAllDanceForms)
  .post(danceFormController.createDanceForm);

router
  .route("/:id")
  .get(danceFormController.getDanceForm)
  .patch(danceFormController.updateDanceForm)
  .delete(danceFormController.deleteDanceForm);

module.exports = router;
