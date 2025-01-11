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

module.exports = { getCryptoPrices };