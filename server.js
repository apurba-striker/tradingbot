//server.js
const express = require('express');
const tradingRoutes = require('./routes/tradingRoutes');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// Use the trading routes
app.use('/api/trading', tradingRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Stock Trading Bot API!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
