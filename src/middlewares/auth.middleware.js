const User = require('../models/users.model')
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require('jsonwebtoken')
const {promisify} = require('util')

exports.PROTECT = catchAsync(async(req, res, next) => {

  let token

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(new AppError('You are not logged in, please login to get access', 401))
  }

  const decoded = await promisify(jwt.verify)(
    token, 
    process.env.SECRET_JWT_SEED
  )

  const user = await User.findOne({
    where: {
      id: decoded.id,
      status: 'active'
    }
  })

  if(!user) {
    return next(new AppError('The owner of this token is not longer available', 401))
  }

  if(user.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      user.passwordChangedAt.getTime() / 1000, 10
    )
    if(decoded.iat < changedTimeStamp) {
      return next(new AppError('User recently changed password!, please try again.', 401))
    }
  }

  req.sessionUser = user

  next()
})

exports.protectAccountOwner = catchAsync(async(req, res, next) => {
  const {user, sessionUser} = req
  console.log(user, sessionUser)
  if(user.id !== sessionUser.id) {
    return next(new AppError('You do not own this account', 401))
   }

   next()
})

exports.restricTo = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.sessionUser.role)) {
      return next(new AppError('You do not have permission to perfoirm this action!', 403))
    }
    next()
  }
}