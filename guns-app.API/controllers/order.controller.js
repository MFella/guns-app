const Order = require("../models/order");
const OrderItem = require("../models/orderItem");
const User = require('../models/user');

module.exports = {
    create: async(req, res) => 
    {
        const {startDate, endDate, totalBef, discount, totalAft} = req.body;

        user_id = req.query.id;

        //throw Error(startDate);
        const sDate = new Date(2020, 2, 20);


        const order = await Order.create({
            sDate,
            endDate,
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