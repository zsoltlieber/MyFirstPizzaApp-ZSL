import express from 'express';
import { verifyAdmin } from '../utils/verifyToken.js';

import {
    createAllergen,
    updateAllergen,
    deleteAllergen,
    getAllergensAll,
    getAllergens,
    getAllergen
} from '../controllers/allergens.js';

const allergensRouter = express.Router();

allergensRouter.post("/", verifyAdmin, createAllergen);

//allergensRouter.put("/:id", verifyAdmin, updateAllergen);
allergensRouter.put("/:id", updateAllergen);

allergensRouter.delete("/:id", verifyAdmin, deleteAllergen);

allergensRouter.get("/all", verifyAdmin, getAllergensAll);

allergensRouter.get("/", getAllergens);

allergensRouter.get("/:id", getAllergen);

export default allergensRouter;