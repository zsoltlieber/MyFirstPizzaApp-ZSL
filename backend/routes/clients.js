import express from 'express';
import { verifyClient, verifyAdmin, verifyMainAdmin } from '../utils/verifyToken.js';

import {
    registerClient,
    getClients,
    getClientById,
    updateClientById,
    deleteClientById,
    isRegisteredEMail
} from '../controllers/clients.js';

const clientsRouter = express.Router();

clientsRouter.post("/register", registerClient);

clientsRouter.get("/isRegisteredEMail", isRegisteredEMail);

clientsRouter.get("/", verifyAdmin, getClients);

clientsRouter.get("/:id", verifyClient, getClientById);

clientsRouter.put("/:id", verifyClient, updateClientById);

clientsRouter.delete("/:id", verifyClient, deleteClientById);

export default clientsRouter;