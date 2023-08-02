import Client from '../models/Client.js';
import bcrypt from 'bcryptjs';
import createError from '../utils/error.js';

export const registerClient = async (req, res, next) => {

    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const newClient = new Client(req.body);
        newClient.password = hashedPassword;

        await newClient.save();
        res.status(200).json(newClient);
        console.log(`${newClient.clientName} - ${newClient._id} - client was registered.`);

    } catch (error) {
        next(error);
    }
};

export const getClients = async (req, res, next) => {

    try {
        const clients = (await Client.find()).filter((data) => data.isActive);
        res.status(200).json(clients);

    } catch (error) {
        next(error)
    };
};

export const getClientById = async (req, res, next) => {

    try {
        const actualClient = await Client.findById(req.params.id);

        if (!req.client.isAdmin && !actualClient._id.equals(req.client.id)) {
            return next(createError(403, "Not allowed to access that client data!"))
        }
        else {
            res.status(200).json(actualClient);
        }

    } catch (error) {
        next(error)
    };
};

export const updateClientById = async (req, res, next) => {

    try {
        if (!req.client.isAdmin && !req.params.id.match(req.client.id)) {
            return next(createError(403, "Not allowed to access that client data!"))
        }
        else {
            req.body.lastManipulatorId = req.client.id;
            const updatedClient = await Client.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedClient);
            console.log(`${updatedClient.clientName} - ${updatedClient._id} - has been updated!`);
        }
    } catch (error) {
        next(error)
    };
};

export const deleteClientById = async (req, res, next) => {

    try {
        await Client.findByIdAndDelete(req.params.id);
        res.status(200).json(`${req.params.id} - client has been deleted!`);
        console.log(`${req.params.id} - client has been deleted!`);

    } catch (error) {
        next(error)
    };
};

export default {
    registerClient,
    getClients,
    getClientById,
    updateClientById,
    deleteClientById
}