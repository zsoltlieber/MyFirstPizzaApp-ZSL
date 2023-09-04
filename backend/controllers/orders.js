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

            if (newOrder.orderedItems.length < 1) {
                return next(createError(400, "The order does not have items!"))
            } else {
                const savedOrder = await newOrder.save();
                res.status(200).json(savedOrder);
                console.log(`${savedOrder._id} - order was saved!`)
            }
        }
    }

    catch (error) {
        next(error);
    }
};

export const getOrders = async (req, res, next) => {

    try {
        let orders = null;
        orders = await Order.find()
        if (!req.client.isAdmin) {
            orders = orders.filter((data) => { data.isActive === true && data.orderClientId === req.client.id });
        } else if (req.query.isActive === 'true') {
            orders = orders.filter((data) => data.isActive === true);
        } else if (req.query.isActive === 'false') {
            orders = orders.filter((data) => data.isActive === false);
        }

        if (orders !== null) {
            res.status(200).json(orders);
        } else {
            res.status(200).json("No orders in the database!");
        }
    }

    catch (error) {
        next(error);
    }
};

export const getOrderById = async (req, res, next) => {

    try {
        const actualOrder = await Order.findById(req.params.id);
        if (actualOrder !== null) {
            if (!req.client.isAdmin && !actualOrder.orderClientId.match(req.client.id)) {
                return next(createError(403, "Not allowed to access that client data!"))
            }
            else {
                return res.status(200).json(actualOrder);
            }
        } else {
            return res.status(200).json("No order of the given ID");
        }
    }

    catch (error) {
        next(error);
    }
};

export const updateOrderById = async (req, res, next) => {

    try {
        const actualOrder = await Order.findById(req.params.id);
        if (!req.client.isAdmin && !actualOrder.orderClientId.match(req.client.id)) {
            return next(createError(403, "Not allowed to access that order data!"))
        }
        else {
            req.body.lastManipulatorId = req.client.id;
            const updatedOrder = await Order.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedOrder);
            console.log(`${updatedOrder._id} - order was updated!`);
        }
    }

    catch (error) {
        next(error);
    }
};

export const deleteOrderById = async (req, res, next) => {

    try {
        const actualOrder = await Order.findById(req.params.id);
        if (actualOrder !== null) {
            if (req.client.isMainAdmin) {
                await Order.findByIdAndDelete(req.params.id);
                res.status(200).json(`${req.params.id} - order was deleted!`);
                console.log(`${req.params.id} - order was deleted!`);
            }
            else if (req.client.isAdmin || !req.client.isAdmin && actualOrder.orderClientId.match(req.client.id)) {
                req.body = actualOrder;
                req.body.lastManipulatorId = req.client.id;
                req.body.isActive = false;
                const updatedOrder = await Order.findByIdAndUpdate(
                    req.params.id,
                    { $set: req.body },
                    { new: true }
                );
                res.status(200).json(updatedOrder);
                console.log(`${updatedOrder._id} - order was updated!`);
            }
            else { return next(createError(403, "Not allowed to access that order data!")) }
        }
        else {
            res.status(200).json("No order the given ID!");
        }
    }

    catch (error) {
        next(error);
    }
};

export default {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderById,
    deleteOrderById
}