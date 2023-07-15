import express from 'express';
import { verifyToken, verifyClient, verifyAdmin } from '../utils/verifyToken.js';

import {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrders,
    getOrder
} from '../controllers/orders.js'

const ordersRouter = express.Router();

ordersRouter.post("/", verifyClient, createOrder);

ordersRouter.put("/:id", verifyClient, updateOrder);

ordersRouter.delete("/:id", verifyClient, deleteOrder);

ordersRouter.get("/", verifyAdmin, getOrders);

ordersRouter.get("/:id", verifyClient, getOrder);

export default ordersRouter;