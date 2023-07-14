import express from 'express';
import {
    createAllergen,
    updateAllergen,
    deleteAllergen,
    getAllergen,
    getAllergens
} from '../controllers/allergens.js';

const allergensRouter = express.Router();

allergensRouter.post("/", createAllergen);

allergensRouter.put("/:id", updateAllergen);

allergensRouter.delete("/:id", deleteAllergen);

allergensRouter.get("/", getAllergens);

allergensRouter.get("/:id", getAllergen);

export default allergensRouter;