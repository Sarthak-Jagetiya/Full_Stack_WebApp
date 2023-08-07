const express = require("express");
const stateController = require("./../controllers/stateController");

const router = express.Router();

router.route("/").get(stateController.getAllStates);

module.exports = router;
