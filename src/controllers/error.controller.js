const AppError = require('../utils/appError');
const logger = require('../utils/logger');

const handleCastError23505 = () =>
  new AppError('Duplicate field value: please use another value', 400);

const handleTokenExpiredError = () =>
  new AppError('Your token has expired!, please login again', 401);

const handleJsonWebTokenError = () =>
  new AppError('Invalid token. Please login again.', 401);

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }

  if (process.env.NODE_ENV === 'production') {
    let error = err;

    if (error.parent.code === '23505') error = handleCastError23505();
    if (error.name === 'TokenExpiredError') error = handleTokenExpiredError();
    if (error.name === 'JsonWebTokenError') error = handleJsonWebTokenError();

    sendErrorProd(error, res);
  }

  //aca se quedaba
};



const sendErrorDev = (err, res) => {
  logger.info(err);
  console.log(err);
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  logger.info(err);
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong',
    });
  }
};

module.exports = globalErrorHandler;
