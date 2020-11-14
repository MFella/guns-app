const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const config = require('../config/database')

const User = require('../models/user');

//Register
// router.post('/register', async (req, res, next) => {

//     let newUser = new User(req.body);

//     User.getUserByEmail(newUser.email, (err, user) => 
//     {
//         if(err){console.log(err)}

//         if(user)
//         {
//             res.json({success: false, msg: 'Email already exists!'});
//             return;
//         }

//             User.addUser(newUser, (err, user) => { 
//                 if(err)
//                 {
//                     res.json({success: false, msg: 'Failed to register user'})
//                 } else 
//                 {
//                     res.json({success: true, msg: 'User registered'})
//                 } 
//             });
//     })

// });

// router.post('/login', (req,res,next) => {
//     const email = req.body.email;
//     const password = req.body.password;

//     User.getUserByEmail(email, (err, user) => {

//         if(err) throw err;

//         if(!user)
//         {
//             return res.json({success: false, msg:'User not found ;/'});
//         }

//         User.comparePassword(password, user.password, (err, isMatch) => {

//             if(err) throw err;

//             if(isMatch)
//             {
//                 const token = jwt.sign({user}, config.secret, { expiresIn: 604800 }); 

//                 //return user without the password!

//                 res.json({
//                     success: true, 
//                     token: 'JWT ' + token,
//                     user: {
//                         id: user._id,
//                         name: user.name,
//                         surname: user.surname,
//                         email: user.email
//                     }
//                 })
//             } else
//             {
//                 return res.json({success: false, msg: 'Wrong password'});
//             }

//         });
//     })
// })

// //Wanna protect route?
// //put this: passport.authenticate('jwt', {session: false}), as a second parameter

// //Profile
// router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {

//     res.json({user: req.user});
// });


// module.exports = router;