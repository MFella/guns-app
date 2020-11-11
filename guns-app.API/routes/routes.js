const express = require('express');
const router = new express.Router;
const Gun = require('../controllers/gun.controller');
const Comment = require('../controllers/comment.controller');
router.get('/', (req, res) => res.send('ok'));


//Guns routes:
router.get('/gun/all', Gun.getAllGuns);
router.post('/gun/specific', Gun.getSpecificGun);
router.get('/gun/detail', Gun.getGunDetailed);

//Comments routes:
router.post('/comment/create/', Comment.create); 
router.get('/comment/all', Comment.getAllComments);

module.exports = router; 