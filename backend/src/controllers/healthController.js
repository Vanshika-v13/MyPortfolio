const mongoose = require('mongoose');

const getHealth = (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;

  res.status(200).json({
    success: true,
    environment: process.env.NODE_ENV,
    uptime: `${Math.floor(process.uptime())}s`,
    timestamp: new Date().toISOString(),
    database: isConnected ? 'connected' : 'disconnected',
  });
};

module.exports = {
  getHealth,
};
