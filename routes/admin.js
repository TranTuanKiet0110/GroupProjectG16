const express = require('express');
const router = express.Router();

//get dashboard
router.get("/dashboard", (req, res) => {
    res.send("Home Page")
});

//get category
router.get("/category", (req, res) => {

});

// get seller management
router.get("/sellerManagement", (req, res) => {
    
});

module.exports = router;