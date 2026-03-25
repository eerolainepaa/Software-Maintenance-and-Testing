const express = require('express');
const router = express.Router(); // Isolated router instance; mounted in main.js
const counter = require('./counter');
const logger = require('./logger');

// GET /counter-increase
// Increments the counter by one and returns the new value.
router.get('/counter-increase', (req, res) => {
  logger.info(`[ENDPOINT] GET '/counter-increase'`);
  const value = counter.increase();
  res.json({ count: value });
});

// GET /counter-read
// Returns the current counter value without modifying it.
router.get('/counter-read', (req, res) => {
  logger.info(`[ENDPOINT] GET '/counter-read'`);
  const value = counter.read();
  res.json({ count: value });
});

// GET /counter-reset
// Resets the counter to zero and returns 0.
router.get('/counter-reset', (req, res) => {
  logger.info(`[ENDPOINT] GET '/counter-reset'`);
  const value = counter.reset();
  res.json({ count: value });
});

module.exports = router;