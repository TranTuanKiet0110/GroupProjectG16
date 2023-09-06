const express = require('express');
const router = express.Router();
const Seller = require('../models/seller');

router.post("/register" , async (req, res) =>  {
    const seller = new Seller({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    })

    try {
        const newSeller = await seller.save();
        res.status(201).json(newSeller);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

});

module.exports = router;