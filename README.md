# Crypto Statistics Server

A server-side application built using Node.js, Express, and MongoDB that provides real-time cryptocurrency statistics by leveraging the CoinGecko API. This application tracks real-time data for Bitcoin, Matic-Network, and Ethereum.

## Features

- Real-time cryptocurrency data updates
  - Bitcoin (BTC)
  - Polygon (MATIC)
  - Ethereum (ETH)
- RESTful API architecture
- MongoDB integration for data persistence
- CoinGecko API integration for reliable market data
- Deviation calculation and monitoring

## Technologies Used

- Node.js
- Express.js
- MongoDB
- CoinGecko API
- Environment variables for secure configuration

## Installation

1. Clone the repository:

```bash
git clone https://github.com/1ochaku/Crypto-Tracker.git
cd Crypto-Tracker
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

- Create a `.env` file in the root directory
- Add the following configurations:

```plaintext
MONGO_URI="your_mongodb_uri"
COINGECKO_API="coingecko_api"
PORT=5000
```

## Usage

1. Start the server:

```bash
npm start
```

2. Access the API endpoints:

### Statistics Endpoints

Get current price, volume, and price change for cryptocurrencies:

- Get Bitcoin statistics:

```
GET /stats/bitcoin
```

- Get Matic Network statistics:

```
GET /stats/matic
```

- Get Ethereum statistics:

```
GET /stats/ethereum
```

Response format:

```json
{
  "currentPrice": 45000.0,
  "volume24h": 28000000000,
  "priceChange24h": 2.5
}
```

### Deviation Endpoints

Get standard deviation calculations for cryptocurrencies:

- Get Bitcoin deviation:

```
GET /deviation/bitcoin
```

- Get Matic Network deviation:

```
GET /deviation/matic
```

- Get Ethereum deviation:

```
GET /deviation/ethereum
```

Response format:

```json
{
  "standardDeviation": 4.8
}
```
