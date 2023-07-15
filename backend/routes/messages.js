import express from 'express';
import { verifyToken, verifyClient, verifyAdmin } from '../utils/verifyToken.js';

import {
    createMessage,
    upgradeMessage,
    deleteMessage,
    getMessages,
    getMessage
} from '../controllers/messages.js'

const messagesRouter = express.Router();

messagesRouter.post("/", verifyClient, createMessage);

messagesRouter.put("/:id", verifyClient, upgradeMessage);

messagesRouter.delete("/:id", verifyClient, deleteMessage);

messagesRouter.get("/", verifyAdmin, getMessages);

messagesRouter.get("/:id", verifyClient, getMessage);

export default messagesRouter;