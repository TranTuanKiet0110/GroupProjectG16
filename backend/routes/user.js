const express = require('express');
const router = express.Router();
const Seller = require('../models/seller');
const Customer = require('../models/customer');
const Admin = require('../models/admin');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "hfdsah984yth3ofnw9fyhfh984yt93h98wy98shfdvsdfyg8s7ghfuibvaiuv9"

router.post("/register", async (req, res) => {
    if (req.body.selected == 'seller') {
        //validate for missing input
        if (req.body.name == '' || req.body.email == '' || req.body.phone == '' || req.body.password == '' || req.body.businessName == '') {
            return res.send({error: "Cannot register due to invalid input"})
        }
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
    } else if (req.body.selected == 'customer') {
        if (req.body.name == '' || req.body.email == '' || req.body.phone == '' || req.body.password == '' || req.body.address == '') {
            return res.send({error: "Cannot register due to invalid input"})
        }
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
    } else {
        if (req.body.name == '' || req.body.email == '' || req.body.phone == '' || req.body.password == '' ) {
            return res.send({error: "Cannot register due to invalid input"})
        }
        //validate admin's email
        const existEmail = await Customer.findOne({ email: req.body.email })

        //validate admin's phone
        const existPhone = await Customer.findOne({ phone: req.body.phone })

        //encrypt admin's password
        const encryptedPassword = await bcrypt.hash(req.body.password, 10)

        const admin = new Admin({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: encryptedPassword,
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

            await admin.save()
            res.send({ status: 201 })
        } catch (err) {
            res.send({ status: 400, message: err.message })
        }
    }
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
                const token = jwt.sign({ phone: admin.phone }, JWT_SECRET)

                if (res.status(201)) {
                    return res.json({ status: 201, data: token })
                } else {
                    return res.json({ error: "error " })
                }
            }
            //failed to login
            res.json({ status: "error", error: "Invalid email or password!" })
        }
    } else if (req.body.radioSelected == 'seller') {
        if (req.body.email != '') {
            const seller = await Seller.findOne({ email: email })
            //cannot find email
            if (!seller) {
                return res.json({ error: "User not found!" })
            }
            //compare password in database
            if (seller.status == "approved") {
                if (await bcrypt.compare(password, seller.password)) {
                    const token = jwt.sign({ email: seller.email }, JWT_SECRET)
    
                    if (res.status(201)) {
                        return res.json({ status: 201, data: token })
                    } else {
                        return res.json({ error: "error " })
                    }
                }
                //failed to login
                res.json({ status: "error", error: "Invalid email or password!" })
            }
            res.send({status: 404, msg: "Acount not yet approved"})
        } else {
            const seller = await Seller.findOne({ phone: phone })
            //cannot find phone number
            if (!seller) {
                return res.json({ error: "User not found!" })
            }
            //check account's status
            if (seller.status == "approved") {
                if (await bcrypt.compare(password, seller.password)) {
                    const token = jwt.sign({ phone: seller.phone }, JWT_SECRET)
    
                    if (res.status(201)) {
                        return res.json({ status: 201, data: token })
                    } else {
                        return res.json({ error: "error " })
                    }
                }
                //failed to login
                res.json({ status: "error", error: "Invalid email or password!" })
            }
            //failed to login
            res.send({ status: 404, msg: "Account not yet approved"})
        }   
    }
});

router.post("/adminData", async (req, res) => {
    const { token } = req.body

    try {
        //verify token and account
        const admin = jwt.verify(token, JWT_SECRET)
        const adminEmail = admin.email;
        const adminPhone = admin.phone;
        //login by email
        if (adminEmail != null) {
            Admin.findOne({ email: adminEmail })
                .then((data) => {
                    res.send({ status: 201, data: data })
                })
                .catch((error) => {
                    res.send({ status: "error", data: error })
                })
        } else { //login by phone
            Admin.findOne({ phone: adminPhone })
                .then((data) => {
                    res.send({ status: 201, data: data })
                })
                .catch((error) => {
                    res.send({ status: "error", data: error })
                })
        }
    } catch (err) {
        res.send({ status: "error", data: error })
    }
});

router.post("/sellerData", async (req, res) => {
    const { token } = req.body

    try {
        //verify token and account
        const seller = jwt.verify(token, JWT_SECRET)
        const sellerEmail = seller.email;
        const sellerPhone = seller.phone;
        //login by email
        if (sellerEmail != null) {
            Seller.findOne({ email: sellerEmail })
                .then((data) => {
                    res.send({ status: 201, data: data })
                })
                .catch((error) => {
                    res.send({ status: "error", data: error })
                })
        } else { //login by phone
            Seller.findOne({ phone: sellerPhone })
                .then((data) => {
                    res.send({ status: 201, data: data })
                })
                .catch((error) => {
                    res.send({ status: "error", data: error })
                })
        }
    } catch (err) {
        res.send({ status: "error", data: error })
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

router.patch("/updateSeller/:id", async (req, res) => {
    const { id, newStatus } = req.body

    const seller = await Seller.findOne({ _id: id })
    if (!seller) {
        return res.json({ error: "User not found!" })
    }
    if (newStatus != null) {
        seller.status = newStatus
    }

    try {
        await seller.save()
        res.send({ status: 201 })
    } catch (error) {
        res.send({ status: 400, message: err.message })
    }
});

module.exports = router;