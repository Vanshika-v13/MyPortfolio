const Certificate = require('../models/Certificate');
const asyncHandler = require('../utils/asyncHandler');

const getCertificates = asyncHandler(async (req, res) => {
  const certificates = await Certificate.find()
    .sort({ issueDate: -1, createdAt: -1 })
    .lean();

  res.status(200).json({
    success: true,
    data: certificates,
  });
});

module.exports = {
  getCertificates,
};
