const OrderItem = require('../models/orderItem');
const Order = require('../models/order');
const Gun = require('../models/gun');

module.exports = {
    create: async(req, res) => 
    {
        const {orderId, gunId, quantity} = req.body;
         
        const gunFromDb = Gun.findById(gunId);
        const orderFromDb = Order.findById(orderId);

        if(gunFromDb === null || orderFromDb === null || quantity === 0)
        {
            res.status(400)
            .json({success: false, reason: "Gun doesnt exist or order doesnt exist"});
        }

        //a co, jezeli to juz istnieje? ;O

        const orderItem = OrderItem.create({
            gunId, orderId, quantity
        });

        return res.send(orderItem);

    }

}

