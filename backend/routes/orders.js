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

ordersRouter.post("/", verifyToken, createOrder);

ordersRouter.put("/:id", verifyClient, updateOrder);

ordersRouter.delete("/:id", verifyAdmin, deleteOrder);

ordersRouter.get("/", verifyAdmin, getOrders);

ordersRouter.get("/:id", verifyClient, getOrder);

export default ordersRouter;