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

//module.exports = Gun;