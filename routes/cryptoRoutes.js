const express = require("express");
const router = express.Router();
const cryptoController = require("../controllers/cryptoController");

router.get("/stats/:coin", cryptoController.getStats);
module.exports = router;
