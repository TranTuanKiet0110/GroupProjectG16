const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    subcategoryOf: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },
    additionalAttributes: [{}]

});

module.exports = mongoose.model('Category', categorySchema);