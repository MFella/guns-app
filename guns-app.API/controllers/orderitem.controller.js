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

        if(gunFromDb == undefined || orderFromDb == undefined || quantity == 0)
        {
            return res.status(400)
            .json({success: false, reason: "Gun doesnt exist or order doesnt exist"});
        }

        if(gunFromDb.status !== 'BASKET')
        {
            return res.status(400)
            .send({"msg": "Cant add item - this basket havent got status of BASKET"});
        }

        
        if(user_id.toString() != orderFromDb.user.toString())
        {
            return res.status(401).json({success: false, reason: 'You are not allowed!'});
        }

        //a co, jezeli to juz istnieje? ;O
        const hipoOrderItem = await OrderItem.findOne({item: item, order: order});

        if(hipoOrderItem !== null)
        {
            //orderItem exist -> update it
            hipoOrderItem.update({
                quantity: quantity
            }, (err, aff, res) => 
            {
                if(err) throw err;
            })

            return res.status(200).send({"msg": "Item has been updated", "orderItem": hipoOrderItem});
        }
    
        const orderItem = await OrderItem.create({
            item, order, quantity
        });

        orderFromDb.orderItem.push(orderItem);

        console.log(orderItem);

        return res.status(201).send(orderItem);

    }

}

