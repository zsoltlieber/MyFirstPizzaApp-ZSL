import Message from "../models/Message.js";
import createError from "../utils/error.js";

export const createMessage = async (req, res, next) => {

    try {
        if (req.body.message != undefined && req.body.message != "") {
            req.body.lastManipulatorId = req.client.id;
            req.body.clientId = req.client.id;
            const newMessage = new Message(req.body);
            const savedMessage = await newMessage.save();
            res.status(200).json(savedMessage);
            console.log(`clientId: ${savedMessage.clientId} - messageId: ${savedMessage._id} - message was saved!`);
        } else {
            return next(createError(403, "Message is missing!"))
        }
    }

    catch (error) {
        next(error);
    }
};

export const getMessages = async (req, res, next) => {
    try {
        let messages = null;
        messages = await Message.find();
        if (req.query.isActive === "true") {
            messages = messages.filter((data) => data.isActive === true);
        } else if (req.query.isActive === "false") {
            messages = messages.filter((data) => data.isActive === false);
        }
        if (messages !== null) {
            res.status(200).json(messages);
        } else {
            res.status(200).json("No messages in the database!");
        }
    }

    catch (error) {
        next(error);
    }
};

export const getMessageById = async (req, res, next) => {

    try {
        const actualMessage = await Message.findById(req.params.id);
        if (actualMessage !== null) {
            res.status(200).json(actualMessage);
        } else {
            res.status(200).json("No message the given ID!");
        }
    }

    catch (error) {
        next(error);
    }
};

export const updateMessageById = async (req, res, next) => {

    try {
        const actualMessage = await Message.findById(req.params.id)
        if (!req.client.isAdmin && !actualMessage.lastManipulatorId.match(req.client.id)) {
            return next(createError(403, "Not allowed to access that message data!"))
        }
        else {
            if (!req.body.message) {
                req.body.lastManipulatorId = req.client.id;
                const updatedMessage = await Message.findByIdAndUpdate(
                    req.params.id,
                    { $set: req.body },
                    { new: true }
                );
                res.status(200).json(updatedMessage);
                console.log(`${updatedMessage._id} - ${updatedMessage.clientName} - message has been updated!`);
            } else {
                res.status(200).json("No updatable message!");
            }
        }
    }

    catch (error) {
        next(error);
    }
};

export const deleteMessageById = async (req, res, next) => {

    try {
        const actualMessage = await Message.findById(req.params.id)
        if (actualMessage !== null) {
            if (req.client.isMainAdmin) {
                await Message.findByIdAndDelete(req.params.id);
                res.status(200).json(`${req.params.id} - message has been deleted!`);
                console.log(`${req.params.id} - message has been deleted!`);
            }
            else { return next(createError(403, "Not allowed to access that client data!")) }
        } else {
            res.status(200).json("No message the given ID!");
        }
    }

    catch (error) {
        next(error);
    }
};

export default {
    createMessage,
    getMessages,
    getMessageById,
    updateMessageById,
    deleteMessageById
}