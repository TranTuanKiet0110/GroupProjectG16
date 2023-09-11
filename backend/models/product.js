const mongoose = require("mongoose");

const productScheme = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        imgURL: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Seller'
        },
        dateAdded: {
            type: Date,
            default: Date.now
        },
        additionalAttributes: [{}]
    }
);

const Product = mongoose.model("Product", productScheme);

module.exports = Product;