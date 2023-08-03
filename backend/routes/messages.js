import express from 'express';
import { verifyAdmin, verifyClient, verifyMainAdmin } from '../utils/verifyToken.js';

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

messagesRouter.delete("/:id", verifyMainAdmin, deleteMessageById);

export default messagesRouter;