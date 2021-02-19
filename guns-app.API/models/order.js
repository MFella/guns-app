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
        default: new Date(1111,1,1)
    },
    currencyCode:
    {
        type: String,
        default: 'EUR'
    },
    total: {
        type: String,
        default: '0.00'
    },
    discount: {
        type: Number,
        default: '0.00'
    },
    status: {
        type: String,
        nullable: true,
        default: "BASKET"
    },
    typeOfDelivery:{
        type: String,
        default: ''
    },
    typeOfPayment: {
        type: String,
        default: ''
    },
    orderItem: [{
        type: Schema.Types.ObjectId,
        ref: "OrderItem"
    }]
})

const Order = module.exports = mongoose.model('Order', OrderSchema); 

