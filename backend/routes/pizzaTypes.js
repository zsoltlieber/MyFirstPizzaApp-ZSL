import express from 'express';
import { verifyToken, verifyClient, verifyAdmin } from '../utils/verifyToken.js';

import {
    createPizzaType,
    updatePizzaType,
    deletePizzaType,
    getPizzaTypes,
    getPizzaType
} from '../controllers/pizzaTypes.js';

const pizzaTypesRouter = express.Router();

pizzaTypesRouter.post("/", verifyAdmin, createPizzaType);

pizzaTypesRouter.put("/:id",verifyAdmin, updatePizzaType);

pizzaTypesRouter.delete("/:id", verifyAdmin, deletePizzaType);

pizzaTypesRouter.get("/", verifyClient, getPizzaTypes);

pizzaTypesRouter.get("/:id", verifyClient, getPizzaType);

export default pizzaTypesRouter;