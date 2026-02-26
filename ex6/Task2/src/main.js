const express = require('express');
const logger = require('./logger');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000; // Allow port override via environment variable

// Mount all counter routes at the root path
app.use('/', routes);

// Start the HTTP server and log the startup event
const server = app.listen(PORT, () => {
  logger.info(`[MAIN] Starting`);
  logger.info(`[MAIN] Server listening on port ${PORT}`);
});

// Graceful shutdown on Ctrl+C (SIGINT):
// log the stopping event, close the server, then exit cleanly
process.on('SIGINT', () => {
  logger.info(`[MAIN] Stopping`);
  server.close(() => process.exit(0));
});

// Export app so it can be imported by test suites (e.g. Mocha + supertest)
// without binding to a port
module.exports = app;