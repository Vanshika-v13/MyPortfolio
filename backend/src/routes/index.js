const express = require('express');
const healthRoutes = require('./healthRoutes');
const projectRoutes = require('./projectRoutes');
const certificateRoutes = require('./certificateRoutes');

const router = express.Router();

router.use(healthRoutes);
router.use(projectRoutes);
router.use(certificateRoutes);

module.exports = router;
