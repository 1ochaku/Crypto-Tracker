const axios = require("axios");
const Crypto = require("../models/cryptoData");

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

module.exports = { getCryptoPrices, getStats };