const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    address: String

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

module.exports = mongoose.model('Customer', customerSchema);