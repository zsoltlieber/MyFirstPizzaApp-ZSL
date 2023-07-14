import Message from "../models/Message.js";

export const createMessage = async (req, res, next) => {

    const newMessage = new Message(req.body);

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
        console.log(`${savedMessage.clientId + " - " + savedMessage.clientName} message has been saved!`);
    }
    catch (error) {
        next(error);
    }
};

export const upgradeMessage = async (req, res, next) => {
    try {
        const updatedMessage = await Message.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedMessage);
        console.log(`${updatedMessage.clientId + " - " + updatedMessage.clientName} message has been updated!`);

    } catch (error) {
        next(error);
    }
};

export const deleteMessage = async (req, res, next) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.status(200).json(`${req.params.id} message has been deleted!`);
        console.log(`${req.params.id} message has been deleted!`);

    } catch (error) {
        next(error);
    }
};

export const getMessages = async (req, res, next) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);

    } catch (error) {
        next(error);
    }
};

export const getMessage = async (req, res, next) => {
    try {
        const actualMessage = await Message.findById(req.params.id);
        res.status(200).json(actualMessage);

    } catch (error) {
        next(error);
    }
};

export default {
    createMessage,
    upgradeMessage,
    deleteMessage,
    getMessages,
    getMessage,
}