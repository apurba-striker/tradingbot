let stockPrice = parseFloat(process.env.STOCK_START_PRICE) || 100;

const getStockPrice = () => {
    // Simulate random stock price fluctuation (e.g., +/- 10% change for greater movement)
    const change = (Math.random() * 20 - 10) / 100;
    stockPrice += stockPrice * change;

    // Ensure the stock price doesn't go below $1
    stockPrice = Math.max(stockPrice, 1);

    console.log(`New simulated stock price: $${stockPrice.toFixed(2)}`);
    return stockPrice;
};

module.exports = {
    getStockPrice,
};
