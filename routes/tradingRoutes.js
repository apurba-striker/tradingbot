const express = require('express');
const router = express.Router();
const tradingBotController = require('../controllers/tradingBotController');

// Route to start the trading bot
router.get('/start', (req, res) => {
    tradingBotController.startTradingBot();
    res.send('Trading bot started successfully!');
});

// Route to get the bot status
router.get('/status', tradingBotController.getBotStatus);

module.exports = router;
