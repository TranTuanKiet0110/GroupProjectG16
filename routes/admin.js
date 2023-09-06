const express = require('express');
const router = express.Router();

//get dashboard
router.get("/dashboard", (req, res) => {
    res.send("Home Page")
});

module.exports = router;