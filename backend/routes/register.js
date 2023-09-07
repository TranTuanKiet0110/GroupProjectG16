const express = require('express');
const router = express.Router();
const Seller = require('../models/seller');
const Customer = require('../models/customer');
const bcrypt = require("bcrypt");

router.post("/register" , async (req, res) =>  {
    if (req.body.businessName != '') {

        //validate seller's email
        const existEmail = await Seller.findOne( {email: req.body.email })

        //validate seller's phone
        const existPhone = await Seller.findOne( {phone: req.body.phone })

        //encrypt seller's password
        const encryptedPassword = await bcrypt.hash(req.body.password, 10);

        const seller = new Seller({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: encryptedPassword,
            businessName: req.body.businessName
        })

        try {
            //error for email validation
            if (existEmail) {
                return res.json( {error: "Email has been used!" });
            }
            //error for phone validation
            if (existPhone) {
                return res.json( {error: "Phone number has been used!"})
            }

            await seller.save();
            res.send( {status: 201} )
        } catch (err) {
            res.send({ status: 400, message: err.message });
        }
    } else {
        //validate customer's email
        const existEmail = await Customer.findOne({ email: req.body.email })

        //validate customer's phone
        const existPhone = await Customer.findOne( {phone: req.body.phone })

        //encrypt customer's password
        const encryptedPassword = await bcrypt.hash(req.body.password, 10);

        const customer = new Customer({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: encryptedPassword,
            address: req.body.address
        })

        try {
            //error for email validation
            if (existEmail) {
                return res.json( {error: "Email has been used!" });
            }
            //error for phone validation
            if (existPhone) {
                return res.json( {error: "Phone number has been used!"})
            }

            await customer.save();
            res.send( {status: 201} )
        } catch (err) {
            res.send({ status: 400, message: err.message });
        }
    }

});

module.exports = router;