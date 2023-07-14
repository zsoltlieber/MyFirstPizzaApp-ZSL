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

allergensRouter.get("/:id", getAllergen);

allergensRouter.get("/", getAllergens);

export default allergensRouter;