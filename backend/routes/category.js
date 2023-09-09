const express = require('express');
const router = express.Router();
const Category = require('../models/category');

router.post("/createCategory", async (req, res) => {
    const category = new Category({
        name: req.body.name,
        subcategoryOf: req.body.subcategoryOf,
        additionalAttributes: req.body.additionalAttributes
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

router.patch("/updateCategory/:id", async (req, res) => {
    const { id, newName } = req.body

    const category = await Category.findOne( { _id: id })
    if (!category) {
        return res.json({ error: "Category not found!" })
    }
    if (newName != null) {
        category.name = newName
    }

    try {
        await category.save()
        res.send({ status: 201 })
    } catch (error) {
        res.send({ status: 400, message: err.message })
    }
});

router.post("/deleteCategory", async (req, res) => {
    const { id } = req.body
    try {
        await Category.deleteOne({ _id: id }, function (err, res) {
            console.log(err);
        });
        res.send({ status: 201 })
    } catch (error) {
        res.send({ status: 400, message: error.message })
    }
});

module.exports = router;