const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../config/database');
const { response } = require('express');
const Schema = mongoose.Schema;

const OrderItemSchema = new mongoose.Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: "Gun"
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: "Order"
    },
    // gunId:{
    //     type: String
    // },
    // orderId: {
    //     type: String
    // },
    // name: {
    //     type: String,
    //     nullable: true
    // },
    // price: {
    //     type: String,
    //     nullable: true
    // },
    quantity: {
        type: Number,
        default: 0
    }
})

const OrderItem = module.exports = mongoose.model('OrderItem', OrderItemSchema);
