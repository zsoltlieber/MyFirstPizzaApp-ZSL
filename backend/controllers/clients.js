import Client from '../models/Client.js';
import bcrypt from 'bcryptjs';

export const registerClient = (async (req, res, next) => {

        try {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);

            const newClient = new Client(req.body);
            newClient.password = hashedPassword;

            await newClient.save();
            res.status(200).json(newClient);
            console.log(`${newClient.clientName} - client was registered.`);

        } catch (error) {
            next(error);
        }
});

export const updateClient = (async (req, res, next) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedClient);
        console.log(`${updatedClient.clientId + " " + updatedClient.clientName} - has been updated!`);

    } catch (error) {
        next(error)
    };
});

export const deleteClient = (async (req, res, next) => {
    try {
        await Client.findByIdAndDelete(req.params.id);
        res.status(200).json(`${req.params.id} client has been deleted!`);
        console.log(`${req.params.id} client has been deleted!`);

    } catch (error) {
        next(error)
    };
});

export const getClients = (async (req, res, next) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);

    } catch (error) {
        next(error)
    };
});

export const getClient = (async (req, res, next) => {
    try {
        const actualClient = await Client.findById(req.params.id);
        res.status(200).json(actualClient);

    } catch (error) {
        next(error)
    };
});

export default {
    registerClient,
    updateClient,
    deleteClient,
    getClients,
    getClient
}