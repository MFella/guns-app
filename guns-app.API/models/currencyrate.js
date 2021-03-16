const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../config/config');
const { response } = require('express');

const currencyrateSchema = mongoose.Schema({
    base: {
        type: String
    },
    rates:{
        type: Array
    },
    date: {
        type: Date
    }
})

const CurrencyRate = module.exports = mongoose.model("CurrencyRate", currencyrateSchema);
