import express from 'express';
import {
    createMessage,
    upgradeMessage,
    deleteMessage,
    getMessages,
    getMessage
} from '../controllers/messages.js'

const messagesRouter = express.Router();

messagesRouter.post("/", createMessage);

messagesRouter.put("/:id", upgradeMessage);

messagesRouter.delete("/:id", deleteMessage);

messagesRouter.get("/", getMessages);

messagesRouter.get("/:id", getMessage);

export default messagesRouter;