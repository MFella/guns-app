const { Mongoose } = require('mongoose');
const Gun = require('../models/gun');
const data = require('./gunsToSeed');
const mongoose = require('mongoose');
const db = require('../config/database');
const MongoClient = require('mongodb').MongoClient;

// mongoose.connect(db.database);

// mongoose.connection.on('connected', () => {
//     console.log('connected');
// });

console.log(data[1]);

let done = 0;

MongoClient.connect(db.database, (err,db) => {
    if (err) throw err;
    const dbo = db.db('meanauth');
    dbo.collection('guns').deleteMany({}, (err, obj) => {

        if(err) throw err;
        
        data.forEach((el, index, arr) => {
            let name = el.name;
            let category = el.category;
            let description = el.description;
            let price = el.price;
            let gun = new Gun({name, category, description, price});

            dbo.collection('guns').insertOne(gun, (err,res) => {
                done++;
                if(done === data.length)
                {
                    db.close();
                }
            })

        
            // gun.save((err, res) => {
            //     done++;
            //     if(done === data.length)
            //     {
            //         db.close();
            //     }
            // });
            
         })

    });
})



