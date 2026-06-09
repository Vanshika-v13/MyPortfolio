const express = require('express');
const healthRoutes = require('./healthRoutes');
const projectRoutes = require('./projectRoutes');
const certificateRoutes = require('./certificateRoutes');
const contactRoutes = require('./contactRoutes');

const router = express.Router();

router.use(healthRoutes);
router.use(projectRoutes);
router.use(certificateRoutes);
router.use(contactRoutes);

module.exports = router;
