const { createLogger, format, transports } = require('winston');

// Create and configure a shared Winston logger instance used across the application.
// All modules import this single logger to ensure consistent formatting.
const logger = createLogger({
  level: 'info', // Minimum log level; 'info' and above (warn, error) will be output
  format: format.combine(
    // Prepend a human-readable timestamp to every log entry
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    // Custom print template: "TIMESTAMP [LEVEL] MESSAGE"
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}] ${message}`;
    })
  ),
  transports: [
    // Write all logs to stdout (console)
    new transports.Console()
  ]
});

module.exports = logger;