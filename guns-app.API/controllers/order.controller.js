const Order = require("../models/order");
const OrderItem = require("../models/orderItem");
const User = require('../models/user');
const Gun = require('../models/gun');
const orderitemController = require("./orderitem.controller");
const order = require("../models/order");

module.exports = {
    create: async(req, res) => 
    {
        const {total, discount, status, currencyCode} = req.body;

        user_id = req.user._id

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
        user_id = req.user._id;
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
           const basket =  await Order.create({user: req.user._id});
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

        console.log('---------------------')
        console.log('---------------------')
        console.log('---------------------')
        console.log(withOrderItems);
        console.log('---------------------')
        console.log('---------------------')
        console.log('---------------------')

        if(basket.user.toString() === req.user._id.toString())
        {
            return res.send({"basket": basket});
        }else
        {
            res.send({'msg': 'You are not allowed!'});
            return res.status(401);
        }
    },

    findAll: async(req, res) => 
    {
        user_id = req.user._id;

        if(!user_id) throw new Error("Internal error! User doesnt exists");

        orders = await Order.find({user: user_id});

        res.send(orders);
    },

    findById: async(req, res) => 
    {
        user_id = req.user._id;
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
    }

}