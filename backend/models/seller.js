const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    password: String

    // businessName: {
    //     type: String,
    // },

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