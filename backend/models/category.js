const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    // subcategories: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "Category"
    //     }
    // ],

    additionalAttribute: [{}]

});

module.exports = mongoose.model('Category', categorySchema);