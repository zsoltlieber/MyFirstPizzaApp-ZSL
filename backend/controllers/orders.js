import Order from "../models/Order.js";

export const createOrder = async (req, res, next) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
        console.log(`${savedOrder.clientId} - order has been saved!`)

    } catch (error) {
        next(error);
    }
};

export const updateOrder = async (req, res, next) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedOrder);
        console.log(`${updatedOrder.clientId} - order has been updated!`)

    } catch (error) {
        next(error);
    }
};

export const deleteOrder = async (req, res, next) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json(`${req.params.id} - client has been deleted!`);
        console.log(`${req.params.id} - client has been deleted!`);

    } catch (error) {
        next(error);
    }
};

export const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().filter((data) => data.isActive);
        res.status(200).json(orders);

    } catch (error) {
        next(error);
    }
};

export const getOrder = async (req, res, next) => {
    try {
        const actualOrder = await Order.findById(req.params.id).filter((data) => data.isActive);
        res.status(200).json(actualOrder);

    } catch (error) {
        next(error);
    }
};

export default {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrders,
    getOrder
}