const logger = require('./logger');

// In-memory counter state. Persists only for the lifetime of the process.
let count = 0;

const counter = {
  // Returns the current count without modifying it.
  read() {
    logger.info(`[COUNTER] read ${count}`);
    return count;
  },

  // Increments the count by one and returns the updated value.
  increase() {
    count += 1;
    logger.info(`[COUNTER] increase ${count}`);
    return count;
  },

  // Resets the count back to zero and returns 0.
  reset() {
    count = 0;
    logger.info(`[COUNTER] zeroed ${count}`);
    return count;
  }
};

module.exports = counter;