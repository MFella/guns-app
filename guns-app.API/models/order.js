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
        type: Date,
        default: new Date(2001,1,1)
    },
    endDate: {
        type: Date,
        default: new Date(2010,1,1)
    },
    currencyCode:
    {
        type: String,
        default: 'EUR'
    },
    total: {
        type: String
    },
    discount: {
        type: Number
    },
    status: {
        type: String,
        nullable: true
    },
    orderItem: [{
        type: Schema.Types.ObjectId,
        ref: "OrderItem"
    }]
})

const Order = module.exports = mongoose.model('Order', OrderSchema); 

