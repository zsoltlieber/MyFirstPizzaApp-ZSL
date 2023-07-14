import express from 'express';
import Message from '../models/Messages.js'

const messagesRouter = express.Router();

messagesRouter.post("/", async (req, res) => {

    const newMessage = new Message(req.body);

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
        console.log(`${savedMessage.clientId + " - " + savedMessage.clientName} message has been saved!`);
    
    } catch (error) {
        res.status(500).json(error);
    }
});

messagesRouter.put("/:id", async (req, res) => {
    try {
        const updatedMessage = await Message.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedMessage);
        console.log(`${updatedMessage.clientId + " - " + updatedMessage.clientName} message has been updated!`);

    } catch (error) {
        res.status(500).json(error);
    }
});

messagesRouter.delete("/:id", async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.status(200).json(`${req.params.id} message has been deleted!`);
        console.log(`${req.params.id} message has been deleted!`);

    } catch (error) {
        res.status(500).json(error);
    }
});

messagesRouter.get("/", async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);

    } catch (error) {
        res.status(500).json(error);
    }
});

messagesRouter.get("/:id", async (req, res) => {
    try {
        const actualMessage = await Message.findById(req.params.id);
        res.status(200).json(actualMessage);

    } catch (error) {
        res.status(500).json(error);
    }
});

export default messagesRouter;