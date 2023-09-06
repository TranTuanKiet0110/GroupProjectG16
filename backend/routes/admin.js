const express = require('express');
const router = express.Router();
const Seller = require('../models/seller');

//add seller 
router.post('/', async (req, res) => {
    const seller = new Seller({
        name: req.body.name,
        email: req.body.email
    })
    
    try {
        const newSeller = await seller.save();
        res.status(201).json(newSeller);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//get dashboard
router.get("/dashboard", async (req, res) => {
    try {
        const sellers = await Seller.find();
        res.json(sellers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//get category
router.get("/category", (req, res) => {

});

// get seller management
router.get("/sellerManagement", (req, res) => {
    
});

module.exports = router;