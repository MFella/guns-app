const Gun = require('../models/gun');
const Comment = require('../models/comment');

module.exports = {
    create : async (req, res) => 
    {
        console.log('dasdsa');
        //gun id
        id = req.query.id;

        console.log(id);
        const {rating, date, remarker, content} = req.body;
        const comment = await Comment.create({
            rating,
            date,
            remarker,
            content,
            gun:id
        });
        await comment.save();

        console.log('here');
        
        const gun = await Gun.findById(id);
        gun.comments.push(comment);
        await gun.save();

        return res.send(gun); 
    },

    getAllComments : async (req, res) =>
    {
        //gunId
        id = req.query.id;
        const comments = await Comment.find({gun: id});
        return res.send(comments);

    }
} 