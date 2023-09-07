const express = require("express");
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const cors = require("cors");


// const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');

app.use(cors());
app.use(express.json());
// app.use('/admin', adminRouter);
app.use('/api/user', userRouter);

app.listen(port, () => {
    console.log(`Server start on port ${port}`);
});

mongoose.connect('mongodb://127.0.0.1:27017');
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));
