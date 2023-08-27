import express from 'express';
import { verifyAdmin, verifyMainAdmin } from '../utils/verifyToken.js';

import {
    createPizzaType,
    getPizzaTypes,
    getPizzaTypeById,
    updatePizzaTypeById,
    deletePizzaTypeById
} from '../controllers/pizzaTypes.js';

const pizzaTypesRouter = express.Router();

pizzaTypesRouter.post("/", verifyAdmin, createPizzaType);

pizzaTypesRouter.get("/", getPizzaTypes);

pizzaTypesRouter.get("/:id", getPizzaTypeById);

pizzaTypesRouter.put("/:id", verifyAdmin, updatePizzaTypeById);

pizzaTypesRouter.delete("/:id", verifyAdmin, deletePizzaTypeById);

export default pizzaTypesRouter;