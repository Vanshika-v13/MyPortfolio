const getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend running successfully',
  });
};

module.exports = {
  getHealth,
};
