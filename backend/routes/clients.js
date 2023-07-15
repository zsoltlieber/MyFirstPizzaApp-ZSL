import express from 'express';
import {verifyToken, verifyClient, verifyAdmin } from '../utils/verifyToken.js';

import {
    registerClient,
    updateClient,
    deleteClient,
    getClients,
    getClient
} from '../controllers/clients.js';

const clientsRouter = express.Router();

/*

//check Client status - not necessary in the future, only for studying purpose

clientsRouter.get("/checkAuthentication", (req, res, next) => {
    const loggedClientId = atob(req.cookies.access_token.split('.')[1]).split(",")[0].slice(7, -1);
    res.send(`Hello ${loggedClientId}  Client, you are logged in!`);
    console.log(`Hello ${loggedClientId}  Client, you are logged in!`);
});

clientsRouter.get("/checkClient/:id", (req, res, next) => {
    res.send(`Hello ${req.params.id}}  Client, you are logged in you can delete your account!`);
    console.log(`Hello ${req.params.id}}  Client, you are logged in you can delete your account!`);
});

clientsRouter.get("/checkAdmin/:id", (req, res, next) => {
    res.send(`Hello ${req.params.id}  Admin, you are logged in you can delete all accounts!`);
    console.log(`Hello ${req.params.id}  Admin, you are logged in you can delete all accounts!`);
});
*/

clientsRouter.post("/register", registerClient);

clientsRouter.put("/:id", verifyClient, updateClient);

clientsRouter.delete("/:id", verifyClient, deleteClient);

clientsRouter.get("/", verifyAdmin, getClients);

clientsRouter.get("/:id", verifyClient, getClient);

export default clientsRouter;