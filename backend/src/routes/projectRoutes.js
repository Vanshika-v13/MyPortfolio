const express = require('express');
const {
  getProjects,
  getProjectBySlug,
} = require('../controllers/projectController');

const router = express.Router();

router.get('/projects', getProjects);
router.get('/projects/:slug', getProjectBySlug);

module.exports = router;
