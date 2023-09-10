const express = require("express");
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const cors = require("cors");
const userRouter = require('./routes/user');
const categoryRouter = require('./routes/category');
const { productRoute } = require("./routes/product");
const { customerRoute } = require("./routes/customer");
const { orderRoute } = require("./routes/order");

app.use(cors());
app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use("/products", productRoute);
app.use("/customers", customerRoute);
app.use("/orders", orderRoute);

app.listen(port, () => {
    console.log(`Server start on port ${port}`);
});

mongoose.connect('mongodb://127.0.0.1:27017');
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));
