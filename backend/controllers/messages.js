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
            console.log(`clientId: ${savedMessage.clientId} - messageId: ${savedMessage._id} - message has been saved!`);
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
        if (req.query.isActive === 'true') {
            messages = (await Message.find()).filter((data) => data.isActive === true);
        } else if (req.query.isActive === 'false') {
            messages = (await Message.find()).filter((data) => data.isActive === false);
        } else {
            messages = await Message.find();
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

export const updateMessageById = async (req, res, next) => {                            //TODO

    try {
        const actualMessage = await Message.findById(req.params.id)
        if (!req.client.isAdmin && !actualMessage.lastManipulatorId.match(req.client.id)) {
            return next(createError(403, "Not allowed to access that client data!"))
        }
        else {
            if (req.body.message !== undefined || req.body.message !== "") {
                req.body.lastManipulatorId = req.client.id;
                const updatedMessage = await Message.findByIdAndUpdate(
                    req.params.id,
                    { $set: req.body },
                    { new: true }
                );
                if (updatedMessage !== null) {
                    res.status(200).json(updatedMessage);
                    console.log(`${updatedMessage._id} - ${updatedMessage.clientName} - message has been updated!`);
                } else {
                    res.status(200).json("No message the given ID!");
                }
            } else {
                return next(createError(403, "Message is missing!"))
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
            if (req.client.isAdmin) {
                const actualMessage = await Message.findById(req.params.id);
                await Message.findByIdAndDelete(req.params.id);
                res.status(200).json(`${req.params.id} - message has been deleted!`);
            }
            else if (req.client.isAdmin || !req.client.isAdmin && actualMessage.lastManipulatorId.match(req.client.id)) {
                req.body = actualMessage;
                req.body.lastManipulatorId = req.client.id;
                req.body.isActive = false;
                const updatedMessage = await Message.findByIdAndUpdate(
                    req.params.id,
                    { $set: req.body },
                    { new: true }
                );
                if (updatedMessage !== null) {
                    res.status(200).json(updatedMessage);
                    console.log(`${updatedMessage._id} - ${updatedMessage.clientName} - message has been updated!`);
                }
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