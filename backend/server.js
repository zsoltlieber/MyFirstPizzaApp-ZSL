import express from 'express';
import dotenv from "dotenv";
import mongoose from "mongoose";
import authenticationRoute from './routes/authentication.js';
import clientsRoute from './routes/clients.js';
import allergensRoute from './routes/allergens.js';
import pizzaTypesRoute from './routes/pizzaTypes.js';
import ordersRoute from './routes/orders.js';
import messagesRoute from './routes/messages.js';


const PORT = 8080;
const app = express();
dotenv.config();

/*
var MongoClient = require('mongodb').MongoClient;
//Create a database named "mydb":
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});

*/



const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database created!");
    }
    catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB is disconnected!")
});

mongoose.connection.on("connected", () => {
    console.log("MongoDB is connected!")
});

app.use(express.json());

app.use("/api/auth", authenticationRoute);
app.use("/api/allergens", allergensRoute);
app.use("/api/pizzas", pizzaTypesRoute);
app.use("/api/clients", clientsRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/orders", ordersRoute);

app.listen(PORT, () => {
    connect();
    console.log(`Backend server listen on: ${PORT} port!`)
});