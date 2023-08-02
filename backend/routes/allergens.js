import express from 'express';
import { verifyAdmin } from '../utils/verifyToken.js';

import {
    createAllergen,
    getAllergens,
    getAllergenById,
    deleteAllergenById,
    updateAllergenById
} from '../controllers/allergens.js';

const allergensRouter = express.Router();

allergensRouter.post("/", verifyAdmin, createAllergen);

allergensRouter.get("/", getAllergens);

allergensRouter.get("/:id", getAllergenById);

allergensRouter.delete("/:id", verifyAdmin, deleteAllergenById);

allergensRouter.put("/:id", verifyAdmin, updateAllergenById);

export default allergensRouter;