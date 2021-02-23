const Order = require("../models/order");
const OrderItem = require("../models/orderItem");
const User = require('../models/user');
const Gun = require('../models/gun');
const orderitemController = require("./orderitem.controller");
const order = require("../models/order");
const user = require("../models/user");

module.exports = {
    create: async(req, res) => 
    {
        const {total, discount, status, currencyCode} = req.body;

        let user_id = req.user._id

        const users = await User.find();

        console.log(req.user._id);

        //throw Error(startDate);
        const today = new Date();
        const sDate = new Date(today.getFullYear(), today.getMonth(), today.getDay());
        
        //dummy date;
        const eDate = new Date(1,1,1);

        const order = await Order.create({
            sDate,
            eDate,
            total,
            currencyCode,
            status,
            discount,
            user: user_id
        });  


        //add this to user!

        const user = await User.findById(user_id);
        user.orders.push(order);
        await user.save();

        //await order.save();

        return res.send(order);
    },

    changeOrderStatus: async(req, res) => 
    {
        let user_id = req.user._id;
        const {orderId, newStatus} = req.body;

        const order = await Order.findById(orderId);


        if(order == undefined)
        {
            return res.status(500).send({"msg": "Order doesnt exist!"});
        }

        console.log(`${order.user} and ${user_id}`)

        if(order.user.toString() != user_id.toString())
        {
            return res.status(401).send({"msg": "Thats not your basket"});
        }

        order.update({
            status: newStatus
        }, (err, affected, resp) => 
        {
            if (err) throw err;
            
        });

        if(newStatus.toString() == "WAITING FOR PAYMENT")
        {
            const dateNow = Date.now();

            order.update({
                startDate: new Date(dateNow)
            }, (err, aff, res) => 
            {
                if(err) throw err;
            })

        }

        return res.status(200).send({"msg": "Order status has been updated!", "order": order});

    },

    takeBasket: async(req, res) => 
    {
        const basket = await Order.findOne({status: "BASKET", user: req.user._id}); //.populate('user');

        if(basket === null)
        {
            //create basket
           const basket =  await Order.create({user: req.user._id, startDate: new Date()});
           return res.send({"basket": basket});
        }

        const withOrderItems = await basket.populate('orderItem').execPopulate();

        const orderItems = await OrderItem.find({order: basket._id}).populate('item');


        ///TODO: too much data goes here
        orderItems.forEach((el) =>
        {
           // await el.populate('item');

            withOrderItems.orderItem.push(el);
        })

        if(basket.user.toString() === req.user._id.toString())
        {
            return res.send({"basket": basket});
        }else
        {
            res.send({'msg': 'You are not allowed!'});
            return res.status(401);
        }
    },

    deleteFromBasket: async(req, res) => 
    {
        const user_id = req.user._id;
        console.log(user_id);

        const orderItemId = req.query.id;

        if(!user_id) throw new Error("User doesnt exists");

        const userFromDb = await User.findById(user_id).populate('orderItem');

        if(!userFromDb) throw new Error("User doesnt exists");

        const userBasket = await Order.findOne({user: user_id.toString(), status: "BASKET"}); //.populate('orderItems');

        await userBasket.populate('orderItems').execPopulate();

        if(!userBasket)
        {
            res.status(404);
            return res.send({"res": false, "msg": "Basket for that user doesnt exist"});
        }

        if(!orderItemId || !orderItemId.match(/^[0-9a-fA-F]{24}$/))
        {
            res.status(403);
            return res.send({"res": false, "msg": "Cant delete that item, because it doesnt exist"});
        }

        const orderItems = await OrderItem.find({order: userBasket._id});

        let tempArr = [];
        orderItems.forEach(el => {
            tempArr.push(el.item.toString());
        });

        if(tempArr.includes(orderItemId.toString()))
        {        
            try{

                await OrderItem.deleteOne({item: orderItemId}, (err, obj) =>
                {
                    if(err) throw err;
                }); 
                
                const newOrderItems = await OrderItem.find({order: userBasket._id}).populate('item');
                let summy = 0;

                newOrderItems.forEach(el =>
                {
                    summy += el.quantity * parseFloat(el.item.price);
                });

                summy = summy * 100;
                let roundedSum = Math.round(summy)/100;
                
                await userBasket.updateOne({
                    total: roundedSum
                }, (err, aff, res) =>
                {
                    if(err) throw err;
                })


                res.status(200);
                return res.send({"res": true, "msg": "Order Item has been deleted successfully"});

            }catch(e)
            {
                res.status(500);
                return res.send({"res": false, "msg": "Error occured during deleting orderitem"});
            }
        
        }
        else
        {
            res.status(404);
            return res.send({"res": false, "msg": "Cannot delete this item"});
        }
    },

    findAll: async(req, res) => 
    {
        let user_id = req.user._id;

        if(!user_id) throw new Error("Internal error! User doesnt exists");

        const orders = await Order.find({user: user_id, status: {$ne: 'BASKET'}});

        res.send(orders);
    },

    findById: async(req, res) => 
    {
        let user_id = req.user._id;
        let order_id = req.params.id;

        const order = await Order.findById(order_id, (err, res) => 
        {
            if(err) throw err;

        }).populate('orderItem');

        const orderItems = await OrderItem.find({order: order_id}).populate('item');
        order.orderItem = orderItems;

        if(order.length === 0)
        {
            return res.send({"msg": "Order doesnt exists!"});
            
        }

        if(order.user.toString() != user_id.toString())
        {
            return res.send({"msg": "You havent got an access to that!"});
        }

        //console.log(order);
        return res.status(200).send(order);
    },

    updateOrderItemQuantity: async(req, res) =>
    {
        const {qty, orderItemId} = req.query;
        const user_id = req.user._id;


        if(!qty || !orderItemId)
        {
            res.status(400);

            return res.send({'res': false, 'msg': 'Cant change quantity'});
        }

        if(!user_id)
        {
            res.status(401);
            return res.send({'res': false, 'msg': 'You are not allowed to do this!'});
        }

        const basket = await Order.findOne({status: 'BASKET', user: user_id}).populate('orderItem');

        if(!basket)
        {
            res.status(403);
            return res.send({'res': false, 'msg': 'Forbidden - basket doesnt exists'});
        }

        let orderItems = await OrderItem.find({order: basket.id}); 
        orderItems = orderItems.map(el => el._id.toString());

        if(orderItems.includes(orderItemId.toString()))
        {
            //check if orderItem exists
            const orderItem = OrderItem.findById(orderItemId.toString());

            if(!orderItem)
            {
                res.status(404);
                return res.send({'res': false, 'msg': 'That item doesnt exist ;/'});
            }else
            {
                await orderItem.updateOne({quantity: qty}, (err, res) =>
                {
                    if(err) throw err;
                });


                //update total 

                //TODO
                const newOrderItems = await OrderItem.find({order: basket._id}).populate('item');
                let summy = 0;

                newOrderItems.forEach(el =>
                {
                    summy += el.quantity * parseFloat(el.item.price);
                });

                summy = summy * 100;
                let roundedSum = Math.round(summy)/100;
                
                await basket.updateOne({
                    total: roundedSum
                }, (err, aff, res) =>
                {
                    if(err) throw err;
                });

                //TODO

                res.status(200);
                return res.send({'res': true, 'msg': 'Item has been updated'});
            }
        }else {
            //res.status(404);
            return res.status(404).send({'res': false, 'msg': 'Order item not found'});
        }
    },

    updateBasket: async(req, res) =>
    {

        let orderFromReq = req.body;
        let user_id = req.user._id;

        const orderFromDb = await Order.findById(orderFromReq._id);
        const orderItems = orderFromReq.orderItem;

        delete orderFromReq.orderItem;

        if(!user_id)
        {
            return res.status(401).send({'res': false, 'msg': 'You are not allowed to do this'});
        }

        if(user_id.toString() !== orderFromReq.user.toString())
        {
            return res.status(401).send({'res': false, 'msg': 'You are not allowed to do this'});
        }

        if(orderFromDb._id.toString() !== orderFromReq._id.toString())
        {
            return res.status(401).send({'res': false, 'msg': 'You are not allowed to do this'});
        }


        try{

            console.log(orderItems);

            await Order.updateOne({"_id": orderFromDb._id}, orderFromReq, (err, res) =>
            {
                if(err) throw err;
            });

            orderItems.forEach(async(el) => 
            {
                await OrderItem.updateOne({"_id": el._id}, el, (err, res) =>
                {
                    if(err)
                    {
                        console.log('Error occured!!!');
                        console.log(err);
                    
                    }

                })

            })

            console.log('Order should be updated');

        }catch(e)
        {
            return res.status(500).send({'res': false, 'msg': 'Cant save current state of basket'});
        }

        res.status(200);
        return res.send({'res': true, 'msg': 'Basket has been updated'});
    },

    basketBecameOrder: async(req, res) =>
    {

        let order = req.body;
        const user_id = req.user._id;

        if(!user_id)
        {
            return res.status(401).send({'res': false, 'msg': 'You are not allowed to do this!'});
        }

        const basketFromDb = await Order.findOne({_id: order._id, status: "BASKET"});

        if(!basketFromDb)
        {
            return res.status(404).send({'res': false, 'msg': 'Basket not found!'});
        }

        if(basketFromDb.user.toString() !== user_id.toString())
        {
            return res.status(403).send({'res': false, 'msg': 'You are not allowed to do this!'});
        }

        //section of discount
        const uuid4regex = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}$/i;

        
        if(uuid4regex.test(order.discount_code.toString()))
        {
            order.discount = .25;
            order.total *= .75; 
        }

        order.total = Math.round(order.total*100) / 100;
        order.endDate = new Date();

        delete order.discount_code;

        try{

            order.status = 'ORDER';

            await Order.updateOne({"_id": order._id}, order, (err, raw) =>
            {
                if(err) throw err;

                console.log(raw);
                console.log('Maybe updated...');
            })

            for(let item of order.orderItem)
            {
                await OrderItem.updateOne({"_id": item._id}, item, (err, raw) =>
                {
                    if(err) console.log(err);

                    console.log(raw);
                    console.log('Updated one orderItem...');
                })
            }

            return res.status(200).send({'res': true, 'msg': 'Order was placed and is awaiting payment.'})

        }catch(e)
        {
            return res.status(500).send({'res': false, 'msg': 'Error occured during taking order'});
        }

    }
      

}