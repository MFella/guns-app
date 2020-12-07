const OrderItem = require('../models/orderItem');
const Order = require('../models/order');
const Gun = require('../models/gun');

module.exports = {
    create: async(req, res) => 
    {
        const {item, order, quantity} = req.body;

        user_id = req.user._id;

        const gunFromDb = await Gun.findById(item);
        const orderFromDb = await Order.findById(order);
        console.log(gunFromDb);

        if(gunFromDb == undefined || orderFromDb == undefined || quantity == 0)
        {
            return res.status(400)
            .json({success: false, reason: "Gun doesnt exist or order doesnt exist"});
            
        }

        
        if(user_id.toString() != orderFromDb.user.toString())
        {
            return res.status(401).json({success: false, reason: 'You are not allowed!'});
        }

        //a co, jezeli to juz istnieje? ;O

        const orderItem = await OrderItem.create({
            item, order, quantity
        });

        orderFromDb.orderItem.push(orderItem);

        console.log(orderItem);

        return res.status(201).send(orderItem);

    }

}

