require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Project = require('../models/Project');
const Certificate = require('../models/Certificate');
const projectsData = require('./data/projects');
const certificatesData = require('./data/certificates');

const seedDatabase = async () => {
  let exitCode = 0;

  if (!process.env.MONGODB_URI || !String(process.env.MONGODB_URI).trim()) {
    console.error('Seed aborted: MONGODB_URI is not set.');
    process.exit(1);
  }

  console.log('Starting database seed...');

  try {
    await connectDB();

    console.log('Clearing existing projects and certificates...');
    await Project.deleteMany({});
    await Certificate.deleteMany({});

    const projects = await Project.insertMany(projectsData);
    const certificates = await Certificate.insertMany(certificatesData);

    console.log('--------------------------------------------------');
    console.log('Database seed completed successfully');
    console.log(`Projects:     ${projects.length} inserted`);
    console.log(`Certificates: ${certificates.length} inserted`);
    console.log(`Timestamp:    ${new Date().toISOString()}`);
    console.log('--------------------------------------------------');
  } catch (error) {
    exitCode = 1;
    console.error('--------------------------------------------------');
    console.error('Database seed failed');
    console.error(`Error: ${error.message}`);
    console.error('--------------------------------------------------');
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    }
    process.exit(exitCode);
  }
};

seedDatabase();
