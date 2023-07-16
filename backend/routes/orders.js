import express from 'express';
import { verifyClient, verifyAdmin } from '../utils/verifyToken.js';

import {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrdersAll,
    getOrders,
    getOrder
} from '../controllers/orders.js'

const ordersRouter = express.Router();

ordersRouter.post("/", verifyClient, createOrder);

ordersRouter.put("/:id", verifyClient, updateOrder);

ordersRouter.delete("/:id", verifyAdmin, deleteOrder);

ordersRouter.get("/all", verifyAdmin, getOrdersAll);

ordersRouter.get("/", verifyClient, getOrders);

ordersRouter.get("/:id", verifyClient, getOrder);

export default ordersRouter;