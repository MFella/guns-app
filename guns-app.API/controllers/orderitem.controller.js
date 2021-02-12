const OrderItem = require('../models/orderItem');
const Order = require('../models/order');
const Gun = require('../models/gun');

module.exports = {
    create: async(req, res) => 
    {
        const {item, order, quantity} = req.body;

        let user_id = req.user._id;

        const gunFromDb = await Gun.findById(item);
        const orderFromDb = await Order.findOne({status: "BASKET", user: req.user._id});


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
            await hipoOrderItem.updateOne({
                quantity: quantity
            }, (err, aff, res) => 
            {
                if(err) throw err;
            })

            //  take orderItems from db
            const orderItems = await OrderItem.find({order: orderFromDb.id}).populate('item');

            let summy = 0;

            orderItems.forEach(el =>
            {
                console.log(`QTY: ${el.quantity} and price: ${el.item.price}`);
                summy += el.quantity * parseFloat(el.item.price);
            })

            summy = summy * 100;
            let roundedSum = Math.round(summy)/100;

            await orderFromDb.updateOne({
                total: roundedSum
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
        await orderItem.save(err =>
        {
            if(err) throw err;
        })
        
       // await orderFromDb.orderItem.push(orderItem);
        
        const orderItems = await OrderItem.find({order: orderFromDb.id}).populate('item');
        //await orderFromDb.orderItem.populate('item');
        let summy = 0;

        orderItems.forEach(el =>
        {
            console.log(`QTY: ${el.quantity} and price: ${el.item.price}`);
            summy += el.quantity * parseFloat(el.item.price);
        });

        let fastItem = await Gun.findById(item);

        summy += quantity*parseFloat(fastItem.price);
        summy = summy * 100;
        let roundedSum = Math.round(summy)/100;

        await orderFromDb.updateOne({
            total: roundedSum
        }, (err, aff, res) =>
        {
            if(err) throw err;
        })

        return res.status(201).send(orderItem);
    }

}

