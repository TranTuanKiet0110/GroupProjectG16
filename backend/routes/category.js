const express = require('express');
const router = express.Router();
const Category = require('../models/category');

router.post("/createCategory", async (req, res) => {
    const category = new Category({
        name: req.body.name,
        additionalAttribute: req.body.additionalAttribute
    })

    try {
        await category.save()
        res.send({ status: 201, data: category})
    } catch (error) {
        res.send({ status: 400, message: error.message })
    }
});

router.get("/getAllCategory", async (req, res) => {
    try {
        const allCategory = await Category.find({})
        res.send({ status: 200, data: allCategory })
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;