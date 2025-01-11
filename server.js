// importing required modules
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

// loading environment variables from .env file
dotenv.config();

// initialising the express application
const app = express();

// testing route to fetch the data
app.get("/api/crypto-price", async (req, res) => {
    try {
        const response = await axios.get(`${process.env.COINGECKO_API}/simple/price`, {
            params: {
                ids: "bitcoin,matic-network,ethereum",
                vs_currencies: "usd",
                include_market_cap: true,
                include_24hr_change: true,
            },
        });
        console.log(response.data);
        res.json(response.data);
    } catch (error) {
        // logging the error message to the console
        console.error("Error fetching data from CoinGecko:", error.message);

        // sending a 500 status code with an error message to the client
        res.status(500).json({ error: "Failed to fetch crypto data" });
    }
})

const PORT = process.env.PORT || 5000;

// starting the server and logging a message to the console
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

