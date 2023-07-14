import express from 'express';
import {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrders,
    getOrder
} from '../controllers/orders.js'

const ordersRouter = express.Router();

ordersRouter.post("/", createOrder);

ordersRouter.put("/:id", updateOrder);

ordersRouter.delete("/:id", deleteOrder);

ordersRouter.get("/", getOrders);

ordersRouter.get("/:id", getOrder);

export default ordersRouter;