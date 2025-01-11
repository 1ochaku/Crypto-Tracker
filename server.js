// importing required modules
const express = require("express");
const dotenv = require("dotenv");
const cron = require("node-cron");
const cryptoController = require("./controllers/cryptoController");
const cryptoRoutes = require("./routes/cryptoRoutes");

// loading environment variables from .env file
dotenv.config();

// initialising the express application
const app = express();

// background job that fetches data every 2 hours
cron.schedule("*/2 * * * *", async () => {
    console.log("Running scheduled job: Fetching crypto data...");
    await cryptoController.getCryptoPrices(); // need to work on this as req parameters not defined
});

const PORT = process.env.PORT || 5000;

// starting the server and logging a message to the console
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

