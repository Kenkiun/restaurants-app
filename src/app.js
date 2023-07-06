const express = require('express');
const app = express();
const cors = require('cors');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

const usersRouter = require('./routes/users.routes');
const restaurantsRouter = require('./routes/restaurants.routes');
const mealsRouter = require('./routes/meals.routes');
const ordersRouter = require('./routes/orders.routes');
const morgan = require('morgan');

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/restaurants', restaurantsRouter);
app.use('/api/v1/meals', mealsRouter);
app.use('/api/v1/orders', ordersRouter);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
