const mongoose = require("mongoose");
const user = require("./user");
const Schema = mongoose.Schema;


const gunSchema = Schema({
    name: {
        type: String
    },
    category: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: String
    }
});

const Gun = module.exports = mongoose.model("Gun", gunSchema);

module.exports.getGunByName = (name, callback) => 
{
    Gun.findOne({name: name}, callback);
}

module.exports.deleteAllRecords = () => {
    Gun.remove({});
}

module.exports.getAllGuns = (callback) =>
{
    Gun.find({}, (callback));
}

module.exports.getSpecificGuns = (model, callback) => 
{
    //something is wrong with 'price'?
    //it works via postman ...

    
    const [parsedFloor, parsedCeil] = [parseFloat(model.floor), parseFloat(model.ceil)];
    console.log(parsedCeil);
    const query = { 
        name: new RegExp('^' + model.searchInput),
        price: {$gte: parsedFloor, $lte: parsedCeil},
        category: model.category
    }

    //$gte: parsedFloor,

    console.log(query);
    Gun.find(query, callback);
}

//module.exports = Gun;