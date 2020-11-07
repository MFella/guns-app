const { Mongoose } = require('mongoose');
const Gun = require('../models/gun');
const data = require('./gunsToSeed');
const mongoose = require('mongoose');
const db = require('../config/database');

mongoose.connect(db.database);

mongoose.connection.on('connected', () => {
    console.log('connected');
});

console.log(data[1]);

let done = 0;
data.forEach((el, index, arr) => {
    let name = el.name;
    let category = el.category;
    let description = el.description;
    let price = el.price;
    let gun = new Gun({name, category, description, price});

//    Gun.findOne({name: name}), (a,b,c) => {
//         console.log(a);
//         console.log(b);
//         console.log(c);
//     };


        // gun.save((err, res) => {
        //     done++;
        //     if(done === data.length)
        //     {
        //         mongoose.disconnect();
        //     }
    
        // });

    

})

//mongoose.disconnect();