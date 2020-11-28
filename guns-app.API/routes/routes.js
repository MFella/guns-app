const express = require('express');
const router = new express.Router;
const Gun = require('../controllers/gun.controller');
const Comment = require('../controllers/comment.controller');
const User = require('../controllers/user.controller');
const CurrencyRate = require('../controllers/currencyrate.controller');
const Order = require('..//controllers/order.controller');
const OrderItem = require('../controllers/orderitem.controller');
router.get('/', (req, res) => res.send('ok'));


//Guns routes:
router.get('/guns/all', Gun.getAllGuns);
router.post('/guns/specific', Gun.getSpecificGun);
router.get('/guns/detail', Gun.getGunDetailed);

//Comments routes:
router.post('/comment/create/', Comment.create); 
router.get('/comment/all', Comment.getAllComments);

//User routes: - to continue
router.post('/users/register', User.addUser);
router.post('/users/login', User.loginUser);

//Retrieve Curriensies
router.get('/currencyrate', CurrencyRate.retrieveCurrency);
// router.get('/currencyrate/update', CurrencyRate.setMyCurrency);

//Orders routes:
router.post('/order/create/', Order.create);


module.exports = router; 