const express = require('express');
const { createMeal, getAllMeals, getOneMeal, updateMeal, deleteMeal } = require('../controllers/meals.controllers');
const { createMealValidation } = require('../middlewares/validations.middleware');
const { validMeal } = require('../middlewares/meals.middleware');
const { PROTECT, restricTo } = require('../middlewares/auth.middleware');


const router = express.Router();



router.get('/', getAllMeals)
router.get('/:id', validMeal, getOneMeal)

router.use(PROTECT)
router.post('/:id', restricTo('admin'), createMealValidation, createMeal)
router.patch('/:id', restricTo('admin'), validMeal, updateMeal)
router.delete('/:id', restricTo('admin'), validMeal, deleteMeal)



module.exports = router