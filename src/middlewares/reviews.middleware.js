const Review = require('../models/reviews.model');
const User = require('../models/users.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validReview = catchAsync(async (req, res, next) => {
  const { reviewId } = req.params;
  const {restaurant} = req

  const review = await Review.findOne({
    where: {
      status: true,
      id: reviewId,
      restaurantId: restaurant.id
    },
    include: [
      {
        model: User
      },
    ],

  });

  if (!review) return next(new AppError(`Review not found`, 404));

  req.review = review;
  req.user = review.user;

  next();
});
