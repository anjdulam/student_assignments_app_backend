const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  // Ensure that a status code is always set
  if (!res.statusCode || res.statusCode === 200) {
    res.status(500); // Defaults to 500 if no status code is set or if mistakenly set to 200
  }
  
  const statusCode = res.statusCode;

  // Determine whether to show stack trace
  const showStackTrace = process.env.NODE_ENV === 'development';

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: showStackTrace ? err.stack : undefined,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: showStackTrace ? err.stack : undefined,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: showStackTrace ? err.stack : undefined,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: showStackTrace ? err.stack : undefined,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: showStackTrace ? err.stack : undefined,
      });
      break;
    default:
      res.json({
        title: "Unhandled Error",
        message: "An unexpected error occurred",
        stackTrace: showStackTrace ? err.stack : undefined,
      });
  }
};

module.exports = errorHandler;
