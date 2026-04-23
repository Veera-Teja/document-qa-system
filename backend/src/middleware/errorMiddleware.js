const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
};

const errorHandler = (error, _req, res, _next) => {
  console.error(error);

  res.status(500).json({
    success: false,
    message: error.message || "Internal server error"
  });
};

module.exports = {
  notFoundHandler,
  errorHandler
};
