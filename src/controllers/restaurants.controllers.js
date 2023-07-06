const catchAsync = require('../utils/catchAsync');
const Restaurant = require('../models/restaurants.model');
const Review = require('../models/reviews.model');



exports.createRestaurant = catchAsync(async(req, res, next) => {
  const {name, address, rating} = req.body

  const restaurant = await Restaurant.create({
    name, 
    address,
    rating
  })

  res.status(201).json({
    status: 'success',
    restaurant
  });
})

exports.getAllRestaurants = catchAsync(async(req, res, next) => {

  const restaurants = await Restaurant.findAll({
    where: {
      status: true
    },
    include: [
      {
        model: Review
      }
    ]
  })

  res.status(200).json({
    status: 'success',
    results: restaurants.length,
    restaurants
  });
})

exports.getOneRestaurant = catchAsync(async(req, res, next) => {
  const {restaurant} = req

  res.status(200).json({
    status: 'success', 
    restaurant
  });
})

exports.updateRestaurant = catchAsync(async(req, res, next) => {
  const {restaurant} = req
  const { name, address } = req.body;

  await restaurant.update({ name, address });

  res.status(200).json({
    status: 'success',
    message: 'Restaurant has been updated!',
  });
})

exports.deleteRestaurant = catchAsync(async(req, res, next) => {
  const {restaurant} = req

  await restaurant.update({status: false})

  res.status(200).json({
    status: 'success', 
    message: 'Restaurant disabled.'
  });
})

exports.createReview = catchAsync(async(req, res, next) => {
  const { comment, rating } = req.body
  const {id} = req.params
  const sessionUserId = req.sessionUser.id

  const review = await Review.create({
    comment, 
    rating,
    restaurantId: id,
    userId: sessionUserId
  })

  res.status(200).json({
    status: 'success',
    review
  });
})

exports.updateReview = catchAsync(async(req, res, next) => {
  const {review} = req
  const {comment, rating} = req.body
  
  const reviewUpdate = await review.update({comment, rating})

  res.status(200).json({
    status: 'success',
    reviewUpdate
  })
})

exports.deleteReview = catchAsync(async(req, res, next) => {
  const {review} = req

  await review.update({status: false})

  res.status(200).json({
    status: 'success',
    message: 'Review deleted'
  })
})