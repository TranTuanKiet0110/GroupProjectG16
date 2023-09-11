const express = require('express');
const router = express.Router();
const CartItem = require("../models/cartItem");

router.get("/getAllCartItem", async (req, res) => {
    try {
        const allCartItem = await CartItem.find({})
        res.send({ status: 200, data: allCartItem })
    } catch (error) {
        console.log(error)
    }
});

router.patch("/updateCartItem/:id", async (req, res) => {
    const { id, newStatus } = req.body

    const cartItem = await CartItem.findOne({ _id: id })
    if (!cartItem) {
        return res.json({ error: "Cart item not found!" })
    }
    if (newStatus != null) {
        cartItem.status = newStatus
    }

    try {
        await cartItem.save()
        res.send({ status: 201 })
    } catch (error) {
        res.send({ status: 400, message: err.message })
    }
});


module.exports = router;
