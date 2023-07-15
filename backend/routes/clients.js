import express from 'express';
import { verifyClient, verifyAdmin } from '../utils/verifyToken.js';

import {
    createClient,
    updateClient,
    deleteClient,
    getClients,
    getClient
} from '../controllers/clients.js';

const clientsRouter = express.Router();

/*
clientsRouter.get("/checkAuthentication", verifyToken, (req, res, next) => {
    const loggedClientId = atob(req.cookies.access_token.split('.')[1]).split(",")[0].slice(7, -1);
    res.send(`Hello ${loggedClientId}  Client, you are logged in!`);
    console.log(`Hello ${loggedClientId}  Client, you are logged in!`);
});

clientsRouter.get("/checkClient/:id", verifyClient, (req, res, next) => {
    res.send(`Hello ${req.params.id}}  Client, you are logged in you can delete your account!`);
    console.log(`Hello ${req.params.id}}  Client, you are logged in you can delete your account!`);
});

clientsRouter.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
    res.send(`Hello ${req.params.id}  Admin, you are logged in you can delete all accounts!`);
    console.log(`Hello ${req.params.id}  Admin, you are logged in you can delete all accounts!`);
});
*/

clientsRouter.post("/", createClient);

clientsRouter.put("/:id", verifyClient, updateClient);

clientsRouter.delete("/:id", verifyClient, deleteClient);

clientsRouter.get("/", verifyAdmin, getClients);

clientsRouter.get("/:id", verifyClient, getClient);

export default clientsRouter;