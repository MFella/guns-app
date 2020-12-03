const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../config/database');
const { response } = require('express');
const SALT = 10;
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    surname:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date:
    {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    street:{
        type: String,
        nullable: true
    },
    city: {
        type: String,
        nullable: true
    },
    country: {
        type: String,
        nullable: true
    },
    orders: [{
        type: Schema.Types.ObjectId, 
        ref: "Order"
    }]
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
}

module.exports.getUserByEmail = (email, callback) => {
    const query = {email: email};
    User.findOne(query, callback);
}

module.exports.addUser = (newUser, callback) => {

    console.log(newUser);

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => { 

            if(err) throw err;
 
            newUser.password = hash;
            newUser.save(callback);
        }); 
    });
} 

module.exports.verifyCreds = async(emailFromReq, passwordFromReq, callback) => {

    const user = await User.findOne({email: emailFromReq}); 
    if(user)
    {
        const compare = await bcrypt.compare(user.password, passwordFromReq);
        //how to log in user? -> jwt token ...
        if(compare)
        {

        }

    }
};

module.exports.comparePassword = (pass, hash, callback) => 
{
    bcrypt.compare(pass, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });

}

module.exports.userExists = (user) => 
{ 
    //console.log(user.email);
    User.findOne({email: user.email}, (err, user) => {

        //console.log(user);
        if(err) throw err;

        if(user)
        {
            return true;
        } else return false;
    })

}