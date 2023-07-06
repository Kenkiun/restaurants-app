const express = require('express');
const { createOrder, getUserOrders, updateOrder, deleteOrder } = require('../controllers/orders.controllers');
const { PROTECT } = require('../middlewares/auth.middleware');
const { validMeal } = require('../middlewares/meals.middleware');
const { validUser } = require('../middlewares/users.middleware');
const { validOrder } = require('../middlewares/orders.middleware');



const router = express.Router();



router.use(PROTECT)
router.post('/', createOrder)
router.get('/:me', getUserOrders)
router.patch('/:id', validOrder, updateOrder)
router.delete('/:id', validOrder, deleteOrder)



module.exports = router