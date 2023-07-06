const Meal = require('../models/meals.model');
const Restaurant = require('../models/restaurants.model');
const catchAsync = require('../utils/catchAsync');



exports.createMeal = catchAsync(async(req, res, next) => {
  const {id} = req.params
  const {name, price} = req.body

  const meal = await Meal.create({
    name,
    price,
    restaurantId: id
  })

  res.status(200).json({
    status: 'success',
    message: 'Meal has been created',
    meal
  });
})

exports.getAllMeals = catchAsync(async(req, res, next) => {

  const meals = await Meal.findAll({
    where: {
      status: 'available',
    },
    include: [
      {
        model: Restaurant,
        attributes: {exclude: ['status']}
      }
    ]
  })

  res.status(200).json({
    status: 'success',
    results: meals.length,
    meals
  });
})

exports.getOneMeal = catchAsync(async(req, res, next) => {

  const {meal} = req

  const oneMeal = await Meal.findOne({
    where: {
      id: meal.id,
      status: 'available'
    },
    include: [
      {
        model: Restaurant,
        attributes: {exclude: ['status']}
      }
    ]
  })

  res.status(200).json({
    status: 'success',
    oneMeal
  });
})

exports.updateMeal = catchAsync(async(req, res, next) => {

  const {meal} = req
  const {name, price} = req.body

  const updateMeal = await meal.update({name, price})

  res.status(200).json({
    status: 'success',
    updateMeal
  });
})

exports.deleteMeal = catchAsync(async(req, res, next) => {

  const {meal} = req

  await meal.update({status: 'unavailable'})

  res.status(200).json({
    status: 'success',
    message: 'Meal disabled'
  });
})