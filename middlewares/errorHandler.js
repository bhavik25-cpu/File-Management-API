// errorHandlingMiddleware.js
const errorHandlingMiddleware = (error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ error: 'Internal Server Error', message: error.message });
};

module.exports = errorHandlingMiddleware;
