import Order from "../models/Order.js";
import createError from "../utils/error.js";

export const createOrder = async (req, res, next) => {

    try {
        if (!req.client.isAdmin && !req.body.orderClientId.match(req.client.id)) {
            return next(createError(403, "The login ClientID is not equals the given ClientID!"))
        }
        else {
            req.body.lastManipulatorId = req.client.id;
            req.body.orderClientId = req.client.id;
            const newOrder = new Order(req.body);

            const savedOrder = await newOrder.save();
            res.status(200).json(savedOrder);
            console.log(`${savedOrder._id} - order has been saved!`)
        }

    } catch (error) {
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
            res.status(200).json(orders);
        } else {
            //filter for providing only active and own order except the client is admin
            orders = orders
                .filter(order => order.isActive)
                .filter(order => order.orderClientId.match(req.params.clientId));
            res.status(200).json(orders);
        }

    } catch (error) {
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
            res.status(200).json(actualOrder);
        }

    } catch (error) {
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
            req.body.lastManipulatorId = req.client.id;
            const updatedOrder = await Order.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedOrder);
            console.log(`${updatedOrder._id} - order has been updated!`);
        }

    } catch (error) {
        next(error);
    }
};

export const deleteOrderById = async (req, res, next) => {

    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json(`${req.params.id} - client has been deleted!`);
        console.log(`${req.params.id} - client has been deleted!`);

    } catch (error) {
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