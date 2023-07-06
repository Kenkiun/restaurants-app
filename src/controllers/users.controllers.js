const Meal = require('../models/meals.model');
const Order = require('../models/orders.model');
const Restaurant = require('../models/restaurants.model');
const User = require('../models/users.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const generateJWT = require('../utils/jwt');
const bcrypt = require('bcryptjs');

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, role = 'normal' } = req.body;

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password: encryptedPassword,
    role,
  });

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    message: 'The user has been created',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
      status: 'active',
    },
  });

  if (!user) {
    return next(new AppError(`User with email: ${email} not found, 404`));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError(`Incorrect email or password`, 401));
  }

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;
  const { user } = req;

  const userUpdated = await user.update({ name, email });

  res.status(200).json({
    status: 'success',
    message: 'user has been updated!',
    userUpdated,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: 'disabled' });

  res.status(200).json({
    status: 'success',
    message: 'user has been deleted',
  });
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const { user } = req;

  const order = await Order.findAll({
    where: {
      id: user.id,
    },
    attributes: {
      exclude: ['mealId', 'userId', 'status'],
    },
    include: [
      {
        model: Meal,
        attributes: ['name', 'price'],
      },
      {
        model: Restaurant,
        attributes: ['name'],
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    results: order.length,
    order,
  });
});

exports.orderDetails = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const orderDetails = await Order.findOne({
    where: {
      id,
    },
    include: [
      {
        model: Meal,
        attributes: ['name', 'price'],
      },
      {
        model: Restaurant,
        attributes: ['name'],
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    orderDetails,
  });
});
