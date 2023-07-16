import express from 'express';
import { verifyToken, verifyClient, verifyAdmin } from '../utils/verifyToken.js';

import {
    createMessage,
    updateMessage,
    deleteMessage,
    getMessagesAll,
    getMessages,
    getMessage
} from '../controllers/messages.js'

const messagesRouter = express.Router();

messagesRouter.post("/", createMessage);

messagesRouter.put("/:id", verifyClient, updateMessage);

messagesRouter.delete("/:id", verifyAdmin, deleteMessage);

messagesRouter.get("/all", verifyAdmin, getMessagesAll);

messagesRouter.get("/", getMessages);

messagesRouter.get("/:id", getMessage);

export default messagesRouter;