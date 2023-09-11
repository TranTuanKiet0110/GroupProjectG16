const express = require('express');
const router = express.Router();
const Category = require('../models/category');

//create category
router.post("/createCategory", async (req, res) => {
    if(req.body.subcategoryOf == '') {
        const category = new Category({
            name: req.body.name,
            additionalAttributes: req.body.additionalAttributes
        })
        try {
            await category.save()
            res.send({ status: 201, data: category})
        } catch (error) {
            res.send({ status: 400, message: error.message })
        }
    } else {
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
    }
});

//get all categories
router.get("/getAllCategory", async (req, res) => {
    try {
        const allCategory = await Category.find({})
        res.send({ success: true, status: 200, data: allCategory })
    } catch (error) {
        console.log(error)
    }
});

//update category
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

//delete category
router.post("/deleteCategory", async (req, res) => {
    const { id } = req.body
    try {
        await Category.deleteOne({ _id: id })
        res.send({ status: 204 })
    } catch (error) {
        res.send({ status: 400, message: error.message })
    }
});

module.exports = router;