const OrderItem = require('../models/orderItem');
const Order = require('../models/order');
const Gun = require('../models/gun');

module.exports = {
    create: async(req, res) => 
    {
        const {item, order, quantity} = req.body;

        console.log('---------------------')
        console.log(item);
        console.log('---------------------')
        console.log(order); // that one is useless here, need to be changes
        console.log('---------------------')
        console.log(quantity);
        console.log('---------------------')

        user_id = req.user._id;

        const gunFromDb = await Gun.findById(item);
        const orderFromDb = await Order.findOne({status: "BASKET", user: req.user._id});

        console.log(orderFromDb);

        if(gunFromDb == undefined || orderFromDb == undefined || quantity == 0)
        {
            return res.status(400)
            .json({success: false, reason: "Gun doesnt exist or order doesnt exist"});
        }

        if(orderFromDb.status !== 'BASKET')
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
            hipoOrderItem.updateOne({
                quantity: quantity
            }, (err, aff, res) => 
            {
                if(err) throw err;
            })

            return res.status(200).send({"msg": "Item has been updated", "orderItem": hipoOrderItem});
        }
    
        const orderItem = new OrderItem({item, order, quantity});
        //await OrderItem.create(
        //     {
        //     item, order, quantity
        // };
        //);
        orderItem.save(err =>
            {
                if(err) throw err;
            })

        await orderFromDb.orderItem.push(orderItem);

        console.log(orderItem);

        return res.status(201).send(orderItem);

    }

}

