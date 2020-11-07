const mongoose = require("mongoose");
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

//module.exports = Gun;