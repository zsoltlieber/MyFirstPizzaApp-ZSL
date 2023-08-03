import Order from "../models/Order.js";
import Client from "../models/Client.js";
import createError from "../utils/error.js";

export const createOrder = async (req, res, next) => {

    try {
        const checkClient = await Client.findById(req.client.id);
        if (!req.client.isAdmin && !checkClient.isActive) {
            return next(createError(403, "The client must be registered for ordering!"))
        } else {
            req.body.lastManipulatorId = req.client.id;
            req.body.orderClientId = req.client.id;
            const newOrder = new Order(req.body);

            const savedOrder = await newOrder.save();
            res.status(200).json(savedOrder);
            console.log(`${savedOrder._id} - order has been saved!`)
        }
    }

    catch (error) {
        next(error);
    }
};

export const getOrders = async (req, res, next) => {

    try {
        let orders = await Order.find()
        //for all active orders
        if (req.client.isAdmin) {
            orders = orders
                .filter(order => order.isActive)
        } else {
            //filter for providing only active and own order except the client is admin
            orders = orders
                .filter(order => order.isActive)
                .filter(order => order.orderClientId.match(req.client.id));
        }
        checkedResultMessage(orders, res)
    }

    catch (error) {
        next(error);
    }
};

export const getOrderById = async (req, res, next) => {

    try {
        const actualOrder = await Order.findById(req.params.id);
        if (!req.client.isAdmin && !actualOrder.lastManipulatorId.match(req.client.id)) {
            return next(createError(403, "Not allowed to access that client data!"))
        }
        else {
            checkedResultMessage(actualOrder, res);
        }
    }

    catch (error) {
        next(error);
    }
};

export const updateOrderById = async (req, res, next) => {

    try {
        const actualOrder = await Order.findById(req.params.id);
        if (!req.client.isAdmin && !actualOrder.lastManipulatorId.match(req.client.id)) {
            return next(createError(403, "Not allowed to access that client data!"))
        }
        else {
            const updatedOrder = await Order.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedOrder);
            console.log(`${updatedOrder._id} - order has been updated!`);
        }
    }

    catch (error) {
        next(error);
    }
};

export const deleteOrderById = async (req, res, next) => {

    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json(`${req.params.id} - client has been deleted!`);
        console.log(`${req.params.id} - client has been deleted!`);
    }

    catch (error) {
        next(error);
    }
};

function checkedResultMessage(resultData, res) {

    if (resultData === null) {
        return res.status(200).json("No order of the given ID");
    } else {
        return res.status(200).json(resultData);
    }
}

export default {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderById,
    deleteOrderById
}