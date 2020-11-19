const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = {
    addUser: async(req, res) => 
    {

        let newUser = new User(req.body);

        if(module.exports.userExists(req.body.email))
        {
            res.json({success: false, msg: 'User already exists!'});
        }


        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => { 
    
                if(err) throw err;
     
                newUser.password = hash;
                newUser.save((err, user) => {

                    if(err)
                    {
                        res.json({success: false, msg: 'Cant register user!'});
                    }else 
                    {
                        res.json({success: true, msg: 'User has been reigstered successfully'});
                    }

                });
            }); 
        });
    },

    comparePasswords: (pass, hash, callback) => 
    {
        bcrypt.compare(pass, hash, (err, isMatch) => {
            if(err) throw err;

            callback(null, isMatch);
        });
    },

    getUserByEmail: (email, callback) => 
    {
        User.findOne({email: email}, callback);
    },

    loginUser: (req, res, next) => 
    {

        const email = req.body.email;
        const password = req.body.password; 
    
        module.exports.getUserByEmail(email, (err, user) => {
    
            if(err) throw err;
    
            if(!user)
            {
                return res.json({success: false, msg:'User not found ;/'});
            }
    
            User.comparePassword(password, user.password, (err, isMatch) => {
    
                if(err) throw err;
    
                if(isMatch)
                {
                    const token = jwt.sign({user}, config.secret, { expiresIn: 604800 }); 
    
                    //return user without the password!
    
                    res.json({
                        success: true, 
                        token: 'JWT ' + token,
                        user: {
                            id: user._id,
                            name: user.name,
                            surname: user.surname,
                            email: user.email
                        }
                    })
                } else
                {
                    return res.json({success: false, msg: 'Wrong password'});
                }
    
            });
        })


    },

    userExists: (user) => 
    {
        User.findOne({email: user.email}, (err, res) =>
        {
            if (err) throw err;

            if(res)
            {
                return true;

            } else return false;
        })

    }
}

//module.exports = 