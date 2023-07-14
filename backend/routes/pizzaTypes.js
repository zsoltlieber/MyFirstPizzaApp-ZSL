import express from 'express';
import {
    createPizzaType,
    updatePizzaType,
    deletePizzaType,
    getPizzaTypes,
    getPizzaType
} from '../controllers/pizzaTypes.js';

const pizzaTypesRouter = express.Router();

pizzaTypesRouter.post("/", createPizzaType);

pizzaTypesRouter.put("/:id", updatePizzaType);

pizzaTypesRouter.delete("/:id", deletePizzaType);

pizzaTypesRouter.get("/", getPizzaTypes);

pizzaTypesRouter.get("/:id", getPizzaType);

export default pizzaTypesRouter;