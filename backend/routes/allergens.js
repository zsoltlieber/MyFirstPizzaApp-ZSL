import express from 'express';
import { verifyAdmin, verifyMainAdmin } from '../utils/verifyToken.js';

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

allergensRouter.put("/:id", verifyAdmin, updateAllergenById);

allergensRouter.delete("/:id", verifyAdmin, deleteAllergenById);

export default allergensRouter;