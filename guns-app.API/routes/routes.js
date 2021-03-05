const express = require('express');
const router = new express.Router;
const passport = require('passport');
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
router.post('/order/create/', 
    passport.authenticate('jwt', { session: false }), 
    Order.create);

router.put('/order/update/',
    passport.authenticate('jwt', {session: false}),
    Order.changeOrderStatus
)

router.get('/basket/',
    passport.authenticate('jwt', {session: false}),
    Order.takeBasket
);

// and basket becoming an order ...
router.put('/basket/',
    passport.authenticate('jwt', {session: false}),
    Order.basketBecameOrder
);

//todo

router.put('/basket/wholeUpdate',
    passport.authenticate('jwt', {session: false}),
    Order.updateBasket
);



router.put('/basket/order-item',
    passport.authenticate('jwt', {session: false}),
    Order.updateOrderItemQuantity
);

router.delete('/basket/order-item',
    passport.authenticate('jwt', {session: false}),
    Order.deleteFromBasket
);

router.get('/order-list',
    passport.authenticate('jwt', {session: false}),
    Order.findAllWithPagination); 

router.get('/order-list/:id',
    passport.authenticate('jwt', {session: false}),
    Order.findById
);

//OrderItems routes:
router.post('/order-item/', 
    passport.authenticate('jwt', {session: false}),
    OrderItem.create
)

// function ensureAuth(req, res, next){
    
//     console.log(req.headers['authorization']);
//     if(req.isAuthenticated())
//     {
//         return next();
//     }else res.redirect('/users/login');
// }

module.exports = router; 