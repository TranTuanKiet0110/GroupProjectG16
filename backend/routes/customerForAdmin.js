const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

//get all customers
router.get("/getAllCustomer", async (req, res) => {
    try {
        const allCustomer = await Customer.find({})
        res.send({ status: 200, data: allCustomer })
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;