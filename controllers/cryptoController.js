const axios = require("axios");
const Crypto = require("../models/cryptoData");
const math = require("mathjs");

// gets the cryptoprices for 3 coins and store in db
// coins are: bitcoin, ethereum, matic-network
const getCryptoPrices = async () => {
    // console.log("Running scheduled job: Fetching crypto data...");
    try {
        // fetching data from the api
        const response = await axios.get(`${process.env.COINGECKO_API}/simple/price`, {
            params: {
                ids: "bitcoin,matic-network,ethereum",
                vs_currencies: "usd",
                include_market_cap: true,
                include_24hr_change: true,
            },
        })
        
        const data = response.data;
        const records = Object.keys(data).map((coinId) => ({
            coin: coinId,
            price: data[coinId].usd,
            marketCap: data[coinId].usd_market_cap,
            "24hChange": data[coinId].usd_24h_change,
        }));

        await Crypto.insertMany(records);
        //logging the fetched data
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
};

// gets the latest data for the entered coin
const getStats = async (req, res) => {
    const { coin } = req.params;

    try {
        const cryptoData = await Crypto.findOne({ coin }).sort({ _id: -1 }).limit(1);

        if (!cryptoData) {
            return res.status(404).json({ error: "No data found for this coin." });
        }

        // returning the relevant data
        res.json({
            price: cryptoData.price,
            marketCap: cryptoData.marketCap,
            "24Change": cryptoData["24hChange"],
        });
    } catch (error) {
        res.status(500).json({ error: "Error fetching stats: " + error.message });
    }
}

// gets the std deviation for the queried coin
const getStdDeviation = async (req, res) => {
    const { coin } = req.params;
    
    try {
        const data = await Crypto.find({ coin }).sort({_id:-1}).limit(100);
        // console.log(data);

        if (!data || data.length === 0) {
            return res.status(404).json({ error: "No data found for this coin." });
        }

        if (data.length < 2) {
            return res.status(400).json({ error: "Not enough data to calculate standard deviation." });
        }

        const values = data.map(entry => entry.price);
        const stdDeviation = math.std(values);  // Using the library function

        res.json({ standardDeviation: stdDeviation.toFixed(2) });

        // res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error computing the standard deviation: " + error.message });
    }
}

module.exports = { getCryptoPrices, getStats, getStdDeviation };