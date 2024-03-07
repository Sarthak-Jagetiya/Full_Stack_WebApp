const express = require("express");
const commentsController = require("../controllers/commentsController");

const router = express.Router();
router
  .route("/")
  .get(commentsController.getAllComments)
  .post(commentsController.createComment);

router
  .route("/:id")
  .get(commentsController.getComment)
  .patch(commentsController.updateComment)
  .delete(commentsController.deleteComment);

module.exports = router;
