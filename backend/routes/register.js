const express = require('express');
const router = express.Router();
const Seller = require('../models/seller');
const Customer = require('../models/customer')

router.post("/register" , async (req, res) =>  {
    const businessNameInput = req.body.businessName
    if (businessNameInput != "") {
        const seller = new Seller({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            businessName: req.body.businessName
        })

        try {
            const newSeller = await seller.save();
            res.status(201).json(newSeller);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }

    } else {

    }

});

module.exports = router;