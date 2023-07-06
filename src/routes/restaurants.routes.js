const express = require('express');
const {
  createRestaurant,
  getAllRestaurants,
  getOneRestaurant,
  updateRestaurant,
  deleteRestaurant,
  createReview,
  deleteReview,
  updateReview,
} = require('../controllers/restaurants.controllers');
const { validRestaurant } = require('../middlewares/restaurants.middleware');
const { validReview } = require('../middlewares/reviews.middleware');
const {
  protectAccountOwner,
  PROTECT,
  restricTo,
} = require('../middlewares/auth.middleware');
const {
  createRestaurantValidation, createReviewValidation,
} = require('../middlewares/validations.middleware');



const router = express.Router();



router.get('/', getAllRestaurants);
router.get('/:id', validRestaurant, getOneRestaurant);

router.post(
  '/',
  PROTECT,
  restricTo('admin'),
  createRestaurantValidation,
  createRestaurant
);

router.patch(
  '/:id',
  PROTECT,
  restricTo('admin'),
  validRestaurant,
  updateRestaurant
);

router.delete(
  '/:id',
  PROTECT,
  restricTo('admin'),
  validRestaurant,
  deleteRestaurant
);



router.use(PROTECT);

router.post(
  '/reviews/:id',
  validRestaurant,
  createReviewValidation,
  createReview
);

router.patch(
  '/reviews/:restaurantId/:reviewId',
  validRestaurant,
  validReview,
  protectAccountOwner,
  updateReview
);

router.delete(
  '/reviews/:restaurantId/:reviewId',
  validRestaurant,
  validReview,
  protectAccountOwner,
  deleteReview
);



module.exports = router;
