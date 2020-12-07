const Order = require("../models/order");
const OrderItem = require("../models/orderItem");
const User = require('../models/user');
const Gun = require('../models/gun');
const orderitemController = require("./orderitem.controller");

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

    findAll: async(req, res) => 
    {
        user_id = req.user._id;

        if(!user_id) throw new Error("Internal error! User doesnt exists");


        // orders = User.findById(user_id, (err, user) => 
        // {
        //     if(err) throw err;

        // }).populate('orders');
        orders = await Order.find({user: user_id});

        res.send(orders);

    },

    findById: async(req, res) => 
    {
        user_id = req.user._id;
        order_id = req.params.id;

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

    extractInfo(order,){

    }

}