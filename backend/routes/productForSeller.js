const express = require('express');
const router = express.Router();
const Product = require("../models/product");

router.get("/getAllProduct", async (req, res) => {
    try {
        const allProduct = await Product.find({})
        res.send({ status: 200, data: allProduct })
    } catch (error) {
        console.log(error)
    }
});

router.post("/createProduct", async (req, res) => {
    const {name, description, imgURL, price, category, seller,additionalAttributes} = req.body;
    try {
        const newProduct = new Product({
            name: name,
            description: description,
            imgURL: imgURL,
            price: price,
            category: category,
            seller: seller,
            additionalAttributes: additionalAttributes,
        });
        await newProduct.save();
        res.send({ status: 201, msg: 'New product created'})
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Server error' });
    }
});

router.post("/deleteProduct", async (req, res) => {
    const { id } = req.body
    try {
        await Product.deleteOne({ _id: id })
        res.send({ status: 204 })
    } catch (error) {
        res.send({ status: 400, message: error.message })
    }
});

router.patch("/updateProduct/:id", async (req, res) => {
    const { id, newName, newDescription, newImgURL, newPrice, newCategory, newAdditionalAttributes } = req.body

    const product = await Product.findOne( { _id: id })
    if (!product) {
        return res.json({ error: "Product not found!" })
    }
    if (newName != null) {
        product.name = newName
    }

    if(newDescription != null) {
        product.description = newDescription
    }

    if(newImgURL != null) {
        product.imgURL = newImgURL
    }

    if(newPrice != null) {
        product.price = newPrice
    }

    if(newCategory != null) {
        product.category = newCategory
    }

    if(newAdditionalAttributes != null) {
        product.additionalAttributes = newAdditionalAttributes
    }

    try {
        await product.save()
        res.send({ status: 201 })
    } catch (error) {
        res.send({ status: 400, message: error.message })
    }
});

module.exports = router;