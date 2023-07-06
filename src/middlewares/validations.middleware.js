const {body, validationResult} = require('express-validator')

const validFields = (req, res, next) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()){
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped()
    })
  }
  next()
}

exports.createUserValidation = [
  body('name')
  .notEmpty()
  .withMessage('Name cannot be empty'),
  
  body('email')
  .notEmpty()
  .withMessage('Email cannot be empty')
  .isEmail()
  .withMessage('Must be a valid email'),
  
  body('password')
  .notEmpty()
  .withMessage('Password cannot be empty')
  .isLength({min: 8})
  .withMessage('Password must be at least 8 characters'),

  validFields
]

exports.createRestaurantValidation = [
  body('name')
  .notEmpty()
  .withMessage('Name cannot be empty'),
  
  body('address')
  .notEmpty()
  .withMessage('Address is required'),
  
  body('rating')
  .notEmpty()
  .withMessage('please choose a rating')
  .isIn([1,2,3,4,5])
  .withMessage('Rating does contain invalid value'),

  validFields
]

exports.createReviewValidation = [
  body('comment')
  .notEmpty()
  .withMessage('Empty comment'),
  
  body('rating')
  .notEmpty()
  .withMessage('please choose a rating')
  .isIn([1,2,3,4,5])
  .withMessage('Rating does contain invalid value'),

  validFields
]

exports.createMealValidation = [
  body('name')
  .notEmpty()
  .withMessage('Empty comment'),
  
  body('price')
  .notEmpty()
  .withMessage('price is required')
  .isFloat()
  .withMessage('price does contain invalid value'),

  validFields
]

exports.createOrderValidation = [
  body('mealId')
  .notEmpty()
  .withMessage('Empty comment'),
  
  body('price')
  .notEmpty()
  .withMessage('price is required')
  .isFloat()
  .withMessage('price does contain invalid value'),

  validFields
]