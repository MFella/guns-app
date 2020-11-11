const mongoose = require("mongoose");
const user = require("./user");
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
    rating: {
        type: String
    },
    date: {
        type: Date
    },
    remarker: {
        type: String
    },
    content: {
        type: String
    },
    gun: {
        type: Schema.Types.ObjectId,
        ref: "Gun"
    }
})

const Comment = module.exports = mongoose.model("Comment", commentSchema);



// module.exports.addComment = (req, callback) => 
// {
//     //comm.save(callback);
//     console.log(comment);

//     let id = req.params.id;

//     const comment = await Comment.create({
//         //req.body.rating,

//     })


//     //let gun = req.params;
//     //let id = gun.id;
//     //const {rating, date, remarker} = req.body;
    


// } 