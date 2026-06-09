require('dotenv').config();

const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const connectDB = require('./config/db');

const requiredEnvVars = ['PORT', 'MONGODB_URI', 'NODE_ENV', 'CLIENT_URL'];
const validEnvironments = ['development', 'production'];

const missingEnvVars = requiredEnvVars.filter(
  (key) => !process.env[key] || !String(process.env[key]).trim()
);

if (missingEnvVars.length > 0) {
  console.error('Startup aborted: missing required environment variables.');
  console.error(`Missing: ${missingEnvVars.join(', ')}`);
  console.error('Set all variables in .env or your hosting platform dashboard.');
  process.exit(1);
}

if (!validEnvironments.includes(process.env.NODE_ENV)) {
  console.error(
    `NODE_ENV must be one of: ${validEnvironments.join(', ')}`
  );
  process.exit(1);
}

const port = Number(process.env.PORT);

if (!Number.isInteger(port) || port <= 0) {
  console.error('PORT must be a positive integer');
  process.exit(1);
}

let server;
let isShuttingDown = false;

const closeDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    return;
  }

  await mongoose.connection.close();
  console.log('[shutdown] MongoDB connection closed');
};

const gracefulShutdown = (signal) => {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;
  console.log(`\n[shutdown] ${signal} received — stopping new HTTP requests`);

  const forceExitTimer = setTimeout(() => {
    console.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);

  const finishShutdown = async (exitCode) => {
    clearTimeout(forceExitTimer);

    try {
      await closeDatabase();
      console.log('[shutdown] Graceful shutdown complete');
      process.exit(exitCode);
    } catch (error) {
      console.error('Error during shutdown:', error.message);
      process.exit(1);
    }
  };

  if (!server) {
    console.log('[shutdown] HTTP server was not running');
    finishShutdown(0);
    return;
  }

  server.close(() => {
    console.log('[shutdown] HTTP server closed — no longer accepting connections');
    finishShutdown(0);
  });
};

const startServer = async () => {
  try {
    await connectDB();

    server = http.createServer(app);

    await new Promise((resolve, reject) => {
      server.once('error', reject);
      server.listen(port, () => {
        server.removeListener('error', reject);
        const mongoStatus =
          mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
        const mongoHost =
          mongoose.connection.readyState === 1
            ? mongoose.connection.host
            : 'n/a';

        console.log('--------------------------------------------------');
        console.log('Portfolio Backend API — started successfully');
        console.log(`Port:        ${port}`);
        console.log(`Environment: ${process.env.NODE_ENV}`);
        console.log(`MongoDB:     ${mongoStatus} (${mongoHost})`);
        console.log(`Timestamp:   ${new Date().toISOString()}`);
        console.log('--------------------------------------------------');
        resolve();
      });
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    await closeDatabase();
    process.exit(1);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  gracefulShutdown('unhandledRejection');
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  gracefulShutdown('uncaughtException');
});

startServer();
