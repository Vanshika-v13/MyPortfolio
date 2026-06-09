/**
 * Strips MongoDB operator keys and rejects nested objects in body fields
 * to mitigate NoSQL injection and malformed payloads.
 */
const sanitizeMiddleware = (req, res, next) => {
  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
    req.body = {};
    return next();
  }

  for (const key of Object.keys(req.body)) {
    if (key.startsWith('$') || key.includes('.')) {
      delete req.body[key];
      continue;
    }

    const value = req.body[key];

    if (value !== null && typeof value === 'object') {
      delete req.body[key];
    }
  }

  next();
};

module.exports = sanitizeMiddleware;
