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

dotenv.config();
const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
    console.error("Missing MONGO_URL environment variable");
    process.exit(1);
}

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/allergens", allergensRoute);
app.use("/api/pizzaTypes", pizzaTypesRoute);
app.use("/api/clients", clientsRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/orders", ordersRoute);


//error handler middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,   //developer feature for detailed error information
    });

})

const connect = async () => {
    try {
        await mongoose.connect(MONGO_URL)
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

app.listen(PORT, () => {
    console.log(`Backend server listen on: ${PORT} port!`)
});

connect().catch((err) => {
    console.error(err);
    process.exit(1);
});
