// importing required modules
const express = require("express");
const dotenv = require("dotenv");
const cron = require("node-cron");
const cryptoController = require("./controllers/cryptoController");
const connectDB = require("./config/db");
const cryptoRoutes = require("./routes/cryptoRoutes");

// loading environment variables from .env file
dotenv.config();

// initialising the express application
const app = express();
connectDB();

// routes for all the apis
app.use("/api", cryptoRoutes);

// background job that fetches data every 2 hours
cron.schedule("0 */2 * * *", async () => { //make changes here to fetch how frequently to retrieve data
    console.log("Running scheduled job: Fetching crypto data...");
    try {
        await cryptoController.getCryptoPrices();  // Calling the controller to fetch data
    } catch (error) {
        console.error("Error in scheduled job:", error.message);
    }
});

const PORT = process.env.PORT || 5000;

// starting the server and logging a message to the console
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

