const Order = require("../models/order");
const OrderItem = require("../models/orderItem");
const User = require('../models/user');

module.exports = {
    create: async(req, res) => 
    {
        const {totalBef, discount, totalAft} = req.body;

        user_id = req.query.id;

        const users = await User.find();

        //console.log(req);

        //throw Error(startDate);
        const today = new Date();
        const sDate = new Date(today.getFullYear(), today.getMonth(), today.getDay());
        const eDate = new Date(1,1,1);
        console.log(req);

        const order = await Order.create({
            sDate,
            eDate,
            totalBef,
            totalAft,
            discount,
            user: user_id
        });  


        //add this to user!

        const user = await User.findById(user_id);
        user.orders.push(order);
        await user.save();

        //await order.save();

        return res.send(order);
    }

}