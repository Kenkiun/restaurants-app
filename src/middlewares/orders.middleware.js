const Order = require('../models/orders.model')
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validOrder = catchAsync(async (req, res, next) => {

  const {id} = req.params

  const order = await Order.findOne({
    where: {
      id,
      status: 'active'
    }
  })

  if(!order) return next(new AppError(`Order with id: ${id} not found`, 404))

  req.order = order
    
  next()
});

