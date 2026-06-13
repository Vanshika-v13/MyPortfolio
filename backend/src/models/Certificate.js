const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Certificate title is required'],
      trim: true,
    },
    issuer: {
      type: String,
      required: [true, 'Certificate issuer is required'],
      trim: true,
    },
    issueDate: {
      type: Date,
    },
    credentialUrl: {
      type: String,
      trim: true,
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      trim: true,
    },
    level: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

certificateSchema.index({ issueDate: -1, createdAt: -1 });

module.exports = mongoose.model('Certificate', certificateSchema);
