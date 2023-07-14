import Client from '../models/Client.js';

export const createClient = (async (req, res, next) => {

    const newClient = new Client(req.body);

    try {
        const savedClient = await newClient.save();
        res.status(200).json(savedClient);
        console.log(`${savedClient.clientId + " " + savedClient.firstName + " " + savedClient.lastName} client has been saved!`);

    } catch (error) {
        next(error)
    };
});

export const updateClient = (async (req, res, next) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedClient);
        console.log(`${updatedClient.clientId + " " + updatedClient.firstName + " " + updatedClient.lastName} has been updated!`);

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
    createClient,
    updateClient,
    deleteClient,
    getClients,
    getClient
}