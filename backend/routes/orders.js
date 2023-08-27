import express from 'express';
import { verifyClient, verifyMainAdmin } from '../utils/verifyToken.js';

import {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderById,
    deleteOrderById
} from '../controllers/orders.js'

const ordersRouter = express.Router();

ordersRouter.post("/", verifyClient, createOrder);

ordersRouter.get("/", verifyClient, getOrders);

ordersRouter.get("/:id", verifyClient, getOrderById);

ordersRouter.put("/:id", verifyClient, updateOrderById);

ordersRouter.delete("/:id", verifyClient, deleteOrderById);

export default ordersRouter;