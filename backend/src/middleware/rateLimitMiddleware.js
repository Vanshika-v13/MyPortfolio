const rateLimit = require('express-rate-limit');

/**
 * Global rate limiter placeholder.
 * Tune windowMs and max per route group as traffic patterns emerge.
 */
const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests, please try again later',
  },
});

module.exports = globalRateLimiter;
