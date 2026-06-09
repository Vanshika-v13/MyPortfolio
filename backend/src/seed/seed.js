require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Project = require('../models/Project');
const Certificate = require('../models/Certificate');
const projectsData = require('./data/projects');
const certificatesData = require('./data/certificates');

const seedDatabase = async () => {
  try {
    await connectDB();

    await Project.deleteMany({});
    await Certificate.deleteMany({});

    const projects = await Project.insertMany(projectsData);
    const certificates = await Certificate.insertMany(certificatesData);

    console.log(`Seeded ${projects.length} projects`);
    console.log(`Seeded ${certificates.length} certificates`);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seedDatabase();
