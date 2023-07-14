import express from 'express';
import Order from '../models/Order.js'

const ordersRouter = express.Router();


ordersRouter.post("/", async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
        console.log(`${savedOrder.clientId} order has been saved!`)

    } catch (error) {
        res.status(200).json(error);
    }
});

ordersRouter.put("/:id", async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedOrder);
        console.log(`${updatedOrder.clientId} order has been updated!`)

    } catch (error) {
        res.status(200).json(error);
    }
});

ordersRouter.delete("/:id", async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json(`${req.params.id} client has been deleted!`);
        console.log(`${req.params.id} client has been deleted!`);
    } catch (error) {
        res.status(500).json(error);
    }
});

ordersRouter.get("/:id", async (req, res) => {
    try {
        const actualOrder = await Order.findById(req.params.id);
        res.status(200).json(actualOrder);

    } catch (error) {
        res.status(500).json(error);
    }
});

ordersRouter.get("/", async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);

    } catch (error) {
        res.status(500).json(error);
    }
});

export default ordersRouter;