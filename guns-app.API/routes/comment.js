const Comment = require('../models/comment');
const Gun = require('../models/gun');
const express = require('express');
const router = express.Router();
 
module.exports = router;

//Comment weapon:
router.post('/', (req, res, next) => 
{
    Comment.addComment(req.body, (err, feed) => {

        if (err) throw err;

        if(feed)
        {
            res.json({success: true, msg: 'Comment has been added!'});
            return;
        }

        res.json({success: false, msg: `Couldn't add this comment`});
    })
})