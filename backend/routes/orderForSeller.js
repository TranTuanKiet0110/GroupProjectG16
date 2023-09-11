const express = require("express");
const Order = require("../models/order");
const router = express.Router();

//get all orders
router.get("/getAllOrder", async (req, res) => {
    try {
        const allOrder = await Order.find({})
        res.send({ status: 200, data: allOrder })
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;