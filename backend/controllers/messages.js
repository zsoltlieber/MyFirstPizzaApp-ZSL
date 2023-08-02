import Message from "../models/Message.js";
import createError from "../utils/error.js";

export const createMessage = async (req, res, next) => {

    req.body.lastManipulatorId = req.client.id;
    const newMessage = new Message(req.body);

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
        console.log(`${savedMessage.clientName} - ${savedMessage._id} - message has been saved!`);

    }
    catch (error) {
        next(error);
    }
};

export const getMessages = async (req, res, next) => {

    try {
        const messages = (await Message.find()).filter((data) => data.isActive);
        res.status(200).json(messages);

    } catch (error) {
        next(error);
    }
};

export const getMessageById = async (req, res, next) => {

    try {
        const actualMessage = await Message.findById(req.params.id);
        res.status(200).json(actualMessage);

    } catch (error) {
        next(error);
    }
};

export const updateMessageById = async (req, res, next) => {
    const actualMessage = await Message.findById(req.params.id)

    try {
        if (!req.client.isAdmin && !actualMessage.lastManipulatorId.match(req.client.id)) {
            return next(createError(403, "Not allowed to access that client data!"))
        }
        else {
            req.body.lastManipulatorId = req.client.id;
            const updatedMessage = await Message.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedMessage);
            console.log(`${updatedMessage._id} - ${updatedMessage.clientName} - message has been updated!`);
        }
    } catch (error) {
        next(error);
    }
};

export const deleteMessageById = async (req, res, next) => {

    try {
        await Message.findByIdAndDelete(req.params.id);
        res.status(200).json(`${req.params.id} - message has been deleted!`);
        console.log(`${req.params.id} - message has been deleted!`);

    } catch (error) {
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