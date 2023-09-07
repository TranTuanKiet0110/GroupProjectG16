const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    name: String,
    email: { 
        type: String,
        unique: true
    },
    phone: String,
    password: String,
    businessName: String,
    status: {
        type: String,
        default: 'pending'
    }

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