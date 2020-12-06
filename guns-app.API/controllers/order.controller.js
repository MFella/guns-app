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

        const order = await Order.findById(order_id, (err, res) => 
        {
            if(err) throw err;

        }).populate('orderItem');

        const orderItems = await OrderItem.find({orderId: order_id});
        
        orderItems.forEach(async(el) => 
        {
            let gunAsItem = await Gun.findById(el.gunId);
            el.price = gunAsItem.price;
            el.name = gunAsItem.name;

        })


        //pipe data assiociated with orderItems:
        order.orderItem = orderItems;

        // orderItems.forEach(async(el, index, arr) => 
        // {
        //     const singleProduct = await Gun.findById(el.gunId);
        //    // el.gunPrice = singleProduct.price;
        //     orderItemsPiped.push({
        //         name: singleProduct.name,
        //         price: singleProduct.price, 
        //         quantity: el.quantity
        //     });
        //     // orderItemsPiped[index].name = singleProduct.name;
        //     // orderItemsPiped[index].gunPrice = singleProduct.price;
        //     // orderItemsPiped[index].quantity = el.quantity;
        //     //orderItemsPiped[index]. = el.quantity;
        //     //delete el.orderId;
        //     //console.log(`${index} and ${arr.length}`);

        //     if(index == arr.length-1)
        //     {
        //         console.log('Przypisanie');
        //         order[0].orderItem.push(orderItemsPiped[0]);
        //     }
        // })
        
       
        //order[0].orderItem = orderItems;
        //console.log(order);

        if(order.length === 0)
        {
            return res.send({"msg": "Order doesnt exists!"});
            
        }

        if(order.user.toString() != user_id.toString())
        {
            return res.send({"msg": "You havent got an access to that!"});
        }

        //console.log(order);
        return res.send(order);
    },

    extractInfo(order,){

    }

}