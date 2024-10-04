const stockService = require('../services/stockService');

// Variables to store balance, positions, and history
let balance = parseFloat(process.env.INITIAL_BALANCE) || 10000;
let positions = 0;
let tradeHistory = [];
let prices = [];

// Configuration for moving averages
const shortTermPeriod = 5; // Short-term moving average
const longTermPeriod = 20; // Long-term moving average

// Helper function to calculate the moving average
const calculateMovingAverage = (period, priceData) => {
    if (priceData.length < period) return null;
    const sum = priceData.slice(-period).reduce((acc, price) => acc + price, 0);
    return sum / period;
};

// Trading strategy: Moving Average Crossover
const movingAverageCrossoverStrategy = (currentPrice) => {
    prices.push(currentPrice);

    const shortTermAvg = calculateMovingAverage(shortTermPeriod, prices);
    const longTermAvg = calculateMovingAverage(longTermPeriod, prices);

    console.log(`Current price: ${currentPrice}`);
    console.log(`Short-term average: ${shortTermAvg}, Long-term average: ${longTermAvg}`);

    if (shortTermAvg && longTermAvg) {
        // Buy signal: short-term average crosses above long-term average
        if (shortTermAvg > longTermAvg && balance >= currentPrice) {
            const sharesToBuy = Math.floor(balance / currentPrice);
            balance -= sharesToBuy * currentPrice;
            positions += sharesToBuy;

            tradeHistory.push({
                action: 'BUY',
                shares: sharesToBuy,
                price: currentPrice,
                timestamp: new Date().toISOString(),
            });

            console.log(`Bought ${sharesToBuy} shares at $${currentPrice}. New balance: $${balance}`);
        }
        // Sell signal: short-term average crosses below long-term average
        else if (shortTermAvg < longTermAvg && positions > 0) {
            balance += positions * currentPrice;

            tradeHistory.push({
                action: 'SELL',
                shares: positions,
                price: currentPrice,
                timestamp: new Date().toISOString(),
            });

            console.log(`Sold ${positions} shares at $${currentPrice}. New balance: $${balance}`);
            positions = 0;  // Reset positions after selling
        }
    } else {
        console.log('Not enough data to calculate moving averages yet.');
    }
};

// Function to start the bot
const startTradingBot = () => {
    setInterval(() => {
        const currentPrice = stockService.getStockPrice();
        movingAverageCrossoverStrategy(currentPrice);
    }, parseInt(process.env.STOCK_UPDATE_INTERVAL) || 1000);
};

// Function to get bot's current status
const getBotStatus = (req, res) => {
    const initialBalance = parseFloat(process.env.INITIAL_BALANCE) || 10000;
    const profitLoss = balance - initialBalance;

    res.json({
        balance: parseFloat(balance.toFixed(2)),
        positions,
        tradeHistory,
        profitLoss: parseFloat(profitLoss.toFixed(2)),
    });
};

module.exports = {
    startTradingBot,
    getBotStatus,
};
