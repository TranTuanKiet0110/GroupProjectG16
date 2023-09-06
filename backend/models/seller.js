const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    // password: {
    //     type: String,
    //     required: true
    // },

    // businessName: {
    //     type: String,
    // },

    // phone: {
    //     type: Number,
    // }

    // products: [
    //     {
    //         type: mongoose.Types.ObjectId,
    //         ref: "Product"
    //     }
    // ],

    // orders: [
    //     {
    //         type: mongoose.Types.ObjectId,
    //         ref: "Order"
    //     }
    // ]
});

module.exports = mongoose.model('Seller', sellerSchema);