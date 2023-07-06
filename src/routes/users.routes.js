const express = require('express');
const { signup, login, updateUser, deleteUser, getAllOrders, orderDetails } = require('../controllers/users.controllers');
const { createUserValidation } = require('../middlewares/validations.middleware');
const { validUser } = require('../middlewares/users.middleware');
const { PROTECT, protectAccountOwner, restricTo } = require('../middlewares/auth.middleware');
const router = express.Router();


router.post('/signup', createUserValidation, signup)
router.post('/login', login)

router.use(PROTECT)
router.patch('/:id', validUser, protectAccountOwner, updateUser)
router.delete('/:id', validUser, protectAccountOwner, deleteUser)
router.get('/orders', restricTo('admin'), getAllOrders)
router.get('/order/:id', restricTo('admin'), orderDetails)


module.exports = router