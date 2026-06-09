const express = require('express');
const { submitContact } = require('../controllers/contactController');
const contactRateLimiter = require('../middleware/contactRateLimitMiddleware');
const sanitizeMiddleware = require('../middleware/sanitizeMiddleware');
const {
  contactValidationRules,
  validateContact,
} = require('../middleware/contactValidationMiddleware');

const router = express.Router();

router.post(
  '/contact',
  contactRateLimiter,
  sanitizeMiddleware,
  contactValidationRules,
  validateContact,
  submitContact
);

module.exports = router;
