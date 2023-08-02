import express from 'express';
import { verifyAdmin, verifyClient } from '../utils/verifyToken.js';

import {
    createMessage,
    deleteMessageById,
    getMessageById,
    getMessages,
    updateMessageById
} from '../controllers/messages.js';

const messagesRouter = express.Router();

messagesRouter.post("/", verifyClient, createMessage);

messagesRouter.get("/", getMessages);

messagesRouter.get("/:id", verifyClient, getMessageById);

messagesRouter.put("/:id", verifyClient, updateMessageById);

messagesRouter.delete("/:id", verifyAdmin, deleteMessageById);

export default messagesRouter;