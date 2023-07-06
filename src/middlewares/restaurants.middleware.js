const Restaurant = require('../models/restaurants.model');
const Review = require('../models/reviews.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');


exports.validRestaurant = catchAsync(async (req, res, next) => {

  const {restaurantId} = req.params

  const restaurant = await Restaurant.findOne({
    where: {
      status: true,
      id: restaurantId
    },
    include: [
      {
        model: Review
      }
    ]
  })

  if(!restaurant) return next(new AppError(`Restaurant with id: ${restaurantId} not found`, 404))

  req.restaurant = restaurant
    
  next()
});

