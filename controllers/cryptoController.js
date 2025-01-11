const axios = require("axios");

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
        
        //logging the fetched data
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
};

module.exports = { getCryptoPrices };