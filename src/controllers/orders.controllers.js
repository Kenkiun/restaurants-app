const Meal = require('../models/meals.model');
const Order = require('../models/orders.model');
const Restaurant = require('../models/restaurants.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');


exports.createOrder = catchAsync(async(req, res, next) => {
  const {quantity, mealId} = req.body
  const {sessionUser} = req

  
  const meal = await Meal.findOne({
    where: {
      id: mealId
    }
  })
  
  if(!meal) {
    return next(AppError(`Meal not found`, 404))
  }

  const totalPrice =  quantity * meal.price

  const order = await Order.create({
    userId: sessionUser.id,
    mealId,
    quantity,
    totalPrice
  })

  res.status(200).json({
    status: 'success',
    order
  })
})

exports.getUserOrders = catchAsync(async(req, res, next) => {
  const {sessionUser} = req

  const orders = await Order.findAll({
    where: {
      userId: sessionUser.id
    },
    attributes: {
      exclude: ['mealId', 'userId', 'status']
    },
    include: [
      {
        model: Meal,
        attributes: ['name', 'price'],
        include: [
          {
            model: Restaurant
          }
        ]
      },
    ]
  })

  res.status(200).json({
    status: 'success',
    orders
  })
})

exports.updateOrder = catchAsync(async(req, res, next) => {
  const {order} = req

  await order.update({status: 'completed'})

  res.status(200).json({
    status: 'success',
    message: 'completed'
  });
})

exports.deleteOrder = catchAsync(async(req, res, next) => {
  const {order} = req

  await order.update({status: 'completed'})

  res.status(200).json({
    status: 'success',
    message: 'Order cancelled'
  });
})