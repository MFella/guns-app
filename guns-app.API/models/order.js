const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../config/database');
const { response } = require('express');
const Schema = mongoose.Schema;

const OrderSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date,
        default: new Date(2000,1,1)
    },
    totalBefore: {
        type: String
    },
    discount: {
        type: Number
    },
    totalAfter: {
        type: String
    },
    orderItem: [{
        type: Schema.Types.ObjectId,
        ref: "OrderItem"
    }]
})

const Order = module.exports = mongoose.model('Order', OrderSchema); 

