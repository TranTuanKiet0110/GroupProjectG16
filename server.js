const express = require("express");
const app = express();
const port = 3000;
const { MongoClient } = require("mongodb");
const url = 'mongodb://127.0.0.1:27017/';
const client = new MongoClient(url);

async function connect() {
    try {
        await client.connect();
        console.log("Connect to MongoDB");
        await client.close();
    } catch (err) {
        console.log("Error connecting to MongoDB:", err);
    }
}

app.use(express.json());

app.listen(port, () => {
    console.log(`Server start on port ${port}`);
});

connect();