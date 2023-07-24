import express from 'express';
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from './routes/auth.js';
import clientsRoute from './routes/clients.js';
import allergensRoute from './routes/allergens.js';
import pizzaTypesRoute from './routes/pizzaTypes.js';
import ordersRoute from './routes/orders.js';
import messagesRoute from './routes/messages.js';
import cookieParser from "cookie-parser";

// Use the cors middleware
import cors from 'cors';

const PORT = 8080;
const app = express();
dotenv.config();

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

app.use(cookieParser());
app.use(express.json());
// Use the cors middleware
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/allergens", allergensRoute);
app.use("/api/pizzaTypes", pizzaTypesRoute);
app.use("/api/clients", clientsRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/orders", ordersRoute);

app.listen(PORT, () => {
    console.log(`Backend server listen on: ${PORT} port!`)
});

connect().catch((err) => {
    console.error(err);
    process.exit(1);
});
