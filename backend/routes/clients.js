import express from 'express';
import {
    createClient,
    updateClient,
    deleteClient,
    getClients,
    getClient
} from '../controllers/clients.js';

const clientsRouter = express.Router();

clientsRouter.post("/", createClient);

clientsRouter.put("/:id", updateClient);

clientsRouter.delete("/:id", deleteClient);

clientsRouter.get("/", getClients);

clientsRouter.get("/:id", getClient);

export default clientsRouter;