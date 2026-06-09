const Contact = require('../models/Contact');
const asyncHandler = require('../utils/asyncHandler');

const submitContact = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  await Contact.create({ name, email, message });

  res.status(201).json({
    success: true,
    message: 'Message sent successfully',
  });
});

module.exports = {
  submitContact,
};
