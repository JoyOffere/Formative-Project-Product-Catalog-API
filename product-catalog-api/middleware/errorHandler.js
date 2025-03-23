class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400; // Bad Request
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404; // Not Found
  }
}

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  // Default error status and message
  const status = err.statusCode || 500; // Default to Internal Server Error
  const message = err.message || 'Something went wrong on the server';
  
  // Log additional request context
  console.error(`Request URL: ${req.originalUrl}, Method: ${req.method}, Status: ${status}`);

  res.status(status).json({ 
    error: {
      message: message,
      status: status
    }
  });
};

module.exports = errorHandler;
