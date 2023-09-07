const express = require('express');
const router = express.Router();
const Seller = require('../models/seller');
const Customer = require('../models/customer');
const Admin = require('../models/admin');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "hfdsah984yth3ofnw9fyhfh984yt93h98wy98shfdvsdfyg8s7ghfuibvaiuv9"

router.post("/register", async (req, res) => {
    if (req.body.businessName != '') {

        //validate seller's email
        const existEmail = await Seller.findOne({ email: req.body.email })

        //validate seller's phone
        const existPhone = await Seller.findOne({ phone: req.body.phone })

        //encrypt seller's password
        const encryptedPassword = await bcrypt.hash(req.body.password, 10)

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
                return res.json({ error: "Email has been used!" });
            }
            //error for phone validation
            if (existPhone) {
                return res.json({ error: "Phone number has been used!" })
            }

            await seller.save()
            res.send({ status: 201 })
        } catch (err) {
            res.send({ status: 400, message: err.message })
        }
    } else {
        //validate customer's email
        const existEmail = await Customer.findOne({ email: req.body.email })

        //validate customer's phone
        const existPhone = await Customer.findOne({ phone: req.body.phone })

        //encrypt customer's password
        const encryptedPassword = await bcrypt.hash(req.body.password, 10)

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
                return res.json({ error: "Email has been used!" })
            }
            //error for phone validation
            if (existPhone) {
                return res.json({ error: "Phone number has been used!" })
            }

            await customer.save()
            res.send({ status: 201 })
        } catch (err) {
            res.send({ status: 400, message: err.message })
        }
    }

    // //validate customer's email
    // const existEmail = await Customer.findOne({ email: req.body.email })

    // //validate customer's phone
    // const existPhone = await Customer.findOne({ phone: req.body.phone })

    // //encrypt customer's password
    // const encryptedPassword = await bcrypt.hash(req.body.password, 10)

    // const admin = new Admin({
    //     name: req.body.name,
    //     email: req.body.email,
    //     phone: req.body.phone,
    //     password: encryptedPassword,
    //     address: req.body.address
    // })

    // try {
    //     //error for email validation
    //     if (existEmail) {
    //         return res.json({ error: "Email has been used!" })
    //     }
    //     //error for phone validation
    //     if (existPhone) {
    //         return res.json({ error: "Phone number has been used!" })
    //     }

    //     await admin.save()
    //     res.send({ status: 201 })
    // } catch (err) {
    //     res.send({ status: 400, message: err.message })
    // }
});

router.post("/signin", async (req, res) => {
    const { email, phone, password } = req.body

    if (req.body.radioSelected == 'admin') {
        if (req.body.email != '') {
            const admin = await Admin.findOne({ email: email })
            //cannot find email
            if (!admin) {
                return res.json({ error: "User not found!" })
            }
            //compare password in database
            if (await bcrypt.compare(password, admin.password)) {
                const token = jwt.sign({ email: admin.email }, JWT_SECRET)

                if (res.status(201)) {
                    return res.json({ status: 201, data: token })
                } else {
                    return res.json({ error: "error " })
                }
            }
            //failed to login
            res.json({ status: "error", error: "Invalid email or password!" })
        } else {
            const admin = await Admin.findOne({ phone: phone })
            //cannot find phone number
            if (!admin) {
                return res.json({ error: "User not found!" })
            }
            if (await bcrypt.compare(password, admin.password)) {
                const token = jwt.sign({ email: admin.email }, JWT_SECRET)

                if (res.status(201)) {
                    return res.json({ status: 201, data: token })
                } else {
                    return res.json({ error: "error " })
                }
            }
            //failed to login
            res.json({ status: "error", error: "Invalid email or password!" })
        }
    }
});

router.post("/adminData", async (req, res) => {
    const { token } = req.body

    try {
        const admin = jwt.verify(token, JWT_SECRET)
        const adminEmail = admin.email;
        Admin.findOne({ email: adminEmail })
            .then((data) => {
                res.send({ status: 201, data: data })
            })
            .catch((error) => {
                res.send({ status: "error", data: error })
            })
    } catch (err) {

    }
});

router.get("/getAllSeller", async (req, res) => {
    try {
        const allSeller = await Seller.find({})
        res.send({ status: 200, data: allSeller })
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;