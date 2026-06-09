const Project = require('../models/Project');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find()
    .sort({ featured: -1, createdAt: -1 })
    .lean();

  res.status(200).json({
    success: true,
    data: projects,
  });
});

const getProjectBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  if (!slug || !slug.trim()) {
    throw new AppError('Project slug is required', 400);
  }

  const project = await Project.findOne({ slug: slug.trim().toLowerCase() }).lean();

  if (!project) {
    throw new AppError('Project not found', 404);
  }

  res.status(200).json({
    success: true,
    data: project,
  });
});

module.exports = {
  getProjects,
  getProjectBySlug,
};
