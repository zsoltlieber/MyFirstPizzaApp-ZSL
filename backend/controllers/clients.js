import Client from '../models/Client.js';
import bcrypt from 'bcryptjs';
import createError from '../utils/error.js';

export const registerClient = async (req, res, next) => {
    const clientEmail = req.body.email;

    try {
        getClientEmailList()

        if (
            req.body.clientName !== null &&
            req.body.password !== null &&
            req.body.email !== null &&
            req.body.phoneNumber !== null &&
            req.body.postCode !== null &&
            req.body.city !== null &&
            req.body.streatAndNumber !== null) {

            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);

            const newClient = new Client(req.body);
            newClient.password = hashedPassword;

            await newClient.save();
            res.status(200).json(newClient);
            console.log(`${newClient.clientName} - ${newClient._id} - client was registered.`);

        } else {
            return next(createError(403, "Wrong data (client name or pasword not correct!"))
        }

        const getClientEmailList = async (req, res, next) => {
            const clients = await Client.find()
            checker(clients.map(client => client.email))
        }
        function checker(clientsEmailList) {
            if (clientsEmailList.includes(clientEmail)) {
                console.log("van már ilyen");
                return next(createError(401, "There is another registered client on the given email!"))
            }
        }
    }

    catch (error) {
        next(error);
    }
};

export const getClients = async (req, res, next) => {

    try {
        let clients = null;
        if (req.query.isActive === 'true') {
            clients = (await Client.find()).filter((data) => data.isActive === true);
        } else if (req.query.isActive === 'false') {
            clients = (await Client.find()).filter((data) => data.isActive === false);
        } else {
            clients = await Client.find();
        }
        if (clients !== null) {
            res.status(200).json(clients);
        } else {
            res.status(200).json("No clients in the database!");
        }
    }

    catch (error) {
        next(error)
    };
};

export const getClientById = async (req, res, next) => {

    try {
        const actualClient = await Client.findById(req.params.id);
        if (actualClient !== null) {
            if (!req.client.isAdmin && !req.params.id.match(req.client.id)) {
                return next(createError(403, "Not allowed to access that client data!"))
            }
            res.status(200).json(actualClient);
        }
        else {
            res.status(200).json("No client the given ID!");
        }
    }

    catch (error) {
        next(error)
    };
};

export const updateClientById = async (req, res, next) => {

    try {
        const actualClient = await Client.findById(req.params.id);
        if (actualClient !== null) {
            if (req.body.clientName !== undefined || req.body.clientName !== "") {
                if (!req.client.isAdmin && !req.params.id.match(req.client.id)) {
                    return next(createError(403, "Not allowed to access that client data!"))
                }
                else {
                    req.body.lastManipulatorId = req.client.id;
                    req.body.clientName = actualClient.clientName;
                    req.body.password = actualClient.password;
                    const updatedClient = await Client.findByIdAndUpdate(
                        req.params.id,
                        { $set: req.body },
                        { new: true }
                    );
                    res.status(200).json(updatedClient);
                    console.log(`${updatedClient.clientName} - ${updatedClient._id} - has been updated!`);
                }
            }
        } else {
            res.status(200).json("No client the given ID!");
        }
    }
    catch (error) {
        next(error)
    };
};

export const deleteClientById = async (req, res, next) => {

    try {
        const actualClient = await Client.findById(req.params.id);
        if (actualClient !== null) {
            if (req.client.isMainAdmin) {
                await Client.findByIdAndDelete(req.params.id);
                res.status(200).json(`${req.params.id} - client has been deleted!`);
                console.log(`${req.params.id} - client has been deleted!`);
            }
            else if (req.client.isAdmin || !req.client.isAdmin && req.params.id.match(actualClient.client.id)) {
                req.body = actualClient;
                req.body.lastManipulatorId = req.client.id;
                req.body.isActive = false
                const updatedClient = await Client.findByIdAndUpdate(
                    req.params.id,
                    { $set: req.body },
                    { new: true }
                );
                res.status(200).json(updatedClient);
                console.log(`${updatedClient.clientName} - ${updatedClient._id} - has been updated!`);
            }
            else { return next(createError(403, "Not allowed to access that client data!")) }
        }
        else {
            res.status(200).json("No client the given ID!");
        }
    }
    catch (error) {
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