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

allergensRouter.get("/", getAllergens);

allergensRouter.get("/:id", getAllergen);

export default allergensRouter;