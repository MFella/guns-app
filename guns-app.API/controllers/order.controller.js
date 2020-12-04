const order = require("../models/order");
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

        const order = await Order.find({_id: order_id}); //.populate('orderItem')
        const orderItems = await OrderItem.find({orderId: order_id});
        //pipe data assiociated with orderItems:
        orderItems.forEach(async(el, index, arr) => 
        {
            const singleProduct = await Gun.findById(el.gunId);

            el.gunPrice = singleProduct.price;

            //console.log(singleProduct.price);
            console.log(orderItemsToReturn);
            delete el.orderId;
        })

       
        order[0].orderItem = orderItems;

        if(order.length === 0)
        {
            return res.send({"msg": "Order doesnt exists!"});
            
        }

        if(order[0].user.toString() != user_id.toString())
        {
            return res.send({"msg": "You havent got an access to that!"});
        }

        console.log(order);
        return res.send(order);
    }

}