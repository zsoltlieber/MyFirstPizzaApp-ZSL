import express from 'express';
import { verifyToken, verifyClient, verifyAdmin } from '../utils/verifyToken.js';

import {
    createAllergen,
    updateAllergen,
    deleteAllergen,
    getAllergens,
    getAllergen
} from '../controllers/allergens.js';

const allergensRouter = express.Router();

allergensRouter.post("/", verifyAdmin, createAllergen);

allergensRouter.put("/:id", verifyAdmin, updateAllergen);

allergensRouter.delete("/:id", verifyAdmin, deleteAllergen);

allergensRouter.get("/", verifyClient, getAllergens);

allergensRouter.get("/:id", verifyClient, getAllergen);

export default allergensRouter;