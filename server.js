const express = require("express");
const app = express();
const port = 3000;
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/admin');
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());
const adminRouter = require('./routes/admin');
app.use('/admin', adminRouter);

app.listen(port, () => {
    console.log(`Server start on port ${port}`);
});

connect();