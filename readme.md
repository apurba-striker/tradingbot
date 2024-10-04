# Trading Bot Application

## Overview
This project is a backend service built with **Node.js** that simulates a basic trading bot for a hypothetical stock market. The bot monitors stock price changes in real-time using mock data and executes trades based on a **moving average crossover strategy**. It also tracks the bot’s performance, including balance, positions, and profit/loss.

## Features
- **Real-time Stock Price Simulation**: Simulates real-time stock price changes using mock data.
- **Moving Average Crossover Strategy**: Executes trades when the short-term moving average crosses the long-term moving average.
- **Profit/Loss Tracking**: Keeps track of the bot's balance, open positions, and profit/loss.
- **RESTful API**: Exposes endpoints to start the bot and get the current status, including trade history and profit/loss.
  
## Table of Contents
- [Trading Bot Application](#trading-bot-application)
  - [Overview](#overview)
  - [Features](#features)
  - [Table of Contents](#table-of-contents)
  - [Trading Logic](#trading-logic)
    - [Moving Average Crossover Strategy](#moving-average-crossover-strategy)
      - [Trading Conditions:](#trading-conditions)
  - [API Usage](#api-usage)
    - [Base URL](#base-url)
    - [Endpoints](#endpoints)
      - [1. Start the Trading Bot](#1-start-the-trading-bot)
      - [2. Get the Bot's Current Status](#2-get-the-bots-current-status)
  - [How to Run the Application](#how-to-run-the-application)
    - [Step 1: Clone the Repository](#step-1-clone-the-repository)
    - [Step 2: Install Dependencies](#step-2-install-dependencies)
    - [Step 3: Set Up Environment Variables](#step-3-set-up-environment-variables)
    - [Step 4: Start the Application](#step-4-start-the-application)
    - [Step 6: Check the Bot's Status](#step-6-check-the-bots-status)
    - [Step 5: Start the Trading Bot](#step-5-start-the-trading-bot)
    - [Environment Variables](#environment-variables)

---

## Trading Logic

### Moving Average Crossover Strategy
The bot uses a **moving average crossover strategy** to determine when to buy or sell stocks:
- **Short-Term Moving Average (5 intervals)**: Calculated from the most recent 5 stock prices.
- **Long-Term Moving Average (20 intervals)**: Calculated from the most recent 20 stock prices.

#### Trading Conditions:
- **Buy**: When the short-term moving average crosses **above** the long-term moving average, the bot buys as many shares as possible with the available balance.
- **Sell**: When the short-term moving average crosses **below** the long-term moving average, the bot sells all its shares.

This strategy allows the bot to follow trends in the stock market, buying when prices are rising and selling when prices are falling.

---

## API Usage

### Base URL
The API runs on `http://localhost:3000` by default.

### Endpoints

#### 1. Start the Trading Bot
- **Endpoint**: `/api/trading/start`
- **Method**: `GET`
- **Description**: Starts the trading bot and begins monitoring stock prices and executing trades based on the moving average crossover strategy.
  
**Example Request**:
```bash
curl http://localhost:3000/api/trading/start
```
#### 2. Get the Bot's Current Status
- **Endpoint**: `/api/trading/status`
- **Method**: `GET`
- **Description**: Returns the current status of the trading bot, including:
  - The current balance
  - Number of open positions
  - Trade history (with details of each buy/sell action)
  - Profit or loss

**Example Request**:
```bash
curl http://localhost:3000/api/trading/status
```
Response Example :
```bash

{
  "balance": 10234.56,
  "positions": 0,
  "tradeHistory": [
    {
      "action": "BUY",
      "shares": 50,
      "price": 100.12,
      "timestamp": "2024-10-04T10:15:30.000Z"
    },
    {
      "action": "SELL",
      "shares": 50,
      "price": 110.50,
      "timestamp": "2024-10-04T11:05:15.000Z"
    }
  ],
  "profitLoss": 234.56
}
```

## How to Run the Application

### Step 1: Clone the Repository
First, clone the repository to your local machine:
```bash
git clone https://github.com/apurba-striker/tradingbot
cd tradingbot
```

### Step 2: Install Dependencies
Make sure you have Node.js installed, then install the project dependencies by running:
```bash
npm install
```
### Step 3: Set Up Environment Variables
Create a .env file in the root directory of the project and configure the following environment variables:
```bash
# .env file

# Server Configuration
PORT=3000  # The port the server will run on
STOCK_SYMBOL=AAPL  # The stock symbol the bot is monitoring (for reference)
INITIAL_BALANCE=10000  # The starting balance for the bot
STOCK_UPDATE_INTERVAL=5000  # Interval for fetching new stock prices (in milliseconds)
STOCK_START_PRICE=100  # Initial stock price for the mock data
```
### Step 4: Start the Application
Start the server with the following command:
```bash
npm start

```
This will run the server on the port specified in the .env file (default is http://localhost:3000).

### Step 6: Check the Bot's Status
To check the current status of the trading bot (balance, positions, trade history, and profit/loss), use the following endpoint:
```bash
curl http://localhost:3000/api/trading/status
```
### Step 5: Start the Trading Bot
To start the trading bot, use the following endpoint:
```bash
curl http://localhost:3000/api/trading/start
```
### Environment Variables

-**`PORT`**: The port on which the server runs (default is 3000).
-**`STOCK_SYMBOL`**: The stock symbol for the bot (currently for reference, can be used if extending the app to use real APIs).
-**`INITIAL_BALANCE`**: The initial balance for the bot to start trading with (default is $10,000).
-**`STOCK_UPDATE_INTERVAL`**: The interval (in milliseconds) at which stock prices are updated (default is 5000ms or 5 seconds).
-**`STOCK_START_PRICE`**: The initial stock price for the simulation (default is $100).
