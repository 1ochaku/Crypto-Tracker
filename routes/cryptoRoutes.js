const express = require("express");
const router = express.Router();
const cryptoController = require("../controllers/cryptoController");

//route for getting the recent fetched data
router.get("/stats/:coin", cryptoController.getStats);
//route for getting the std deviation of the coin
router.get("/deviation/:coin", cryptoController.getStdDeviation);

module.exports = router;
