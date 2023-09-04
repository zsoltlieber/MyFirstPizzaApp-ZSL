import Client from '../models/Client.js';
import bcrypt from 'bcryptjs';
import createError from '../utils/error.js';

const getClientEmailList = async (actualClientEmail) => {
    const clients = await Client.find();
    const clientsEmailList = clients.map(client => client.email);
    return !clientsEmailList.includes(actualClientEmail)
}

export const registerClient = async (req, res, next) => {
    const actualClientEmail = req.body.email;

    try {
        if (getClientEmailList(actualClientEmail) &&
            req.body.clientName !== undefined &&
            req.body.password !== undefined &&
            req.body.email !== undefined &&
            req.body.phoneNumber !== undefined &&
            req.body.address !== undefined
        ) {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);

            const newClient = new Client(req.body);
            newClient.password = hashedPassword;

            await newClient.save();
            res.status(200).json(newClient);
            console.log(`${newClient.clientName} - ${newClient._id} - client was registered.`);

        }
        else if (getClientEmailList(actualClientEmail) === true) {
            console.log("The email had been registered! Use log in, or register another email!")

        }
        else {
            return next(createError(200, "Wrong data (client name or pasword not correct!"))
        }
    }

    catch (error) {
        next(error);
    }
};

export const getClients = async (req, res, next) => {

    try {
        let clients = null;

        clients = await Client.find();
        if (req.query.isActive === 'true') {
            clients = clients.filter((data) => data.isActive === true);
        } else if (req.query.isActive === 'false') {
            clients = clients.filter((data) => data.isActive === false);
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
                    console.log(`${updatedClient.clientName} - ${updatedClient._id} - client was updated!`);
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


export const isRegisteredEMail = async (req, res, next) => {
    try {
        const mailList = (await Client.find()).map(client => client.email)
        if (mailList.includes(req.body.email)) {
            return next(createError(403, "The given email is in used, please log in or use another email!"))
        } else {
            res.status(200).json("Not used email!");
        }
    }
    catch (error) {
        next(error)
    }
};

export const deleteClientById = async (req, res, next) => {

    try {
        const actualClient = await Client.findById(req.params.id);
        if (actualClient !== null) {
            if (req.client.isMainAdmin) {
                await Client.findByIdAndDelete(req.params.id);
                res.status(200).json(`${req.params.id} - client was deleted!`);
                console.log(`${req.params.id} - client was deleted!`);
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
                console.log(`${updatedClient.clientName} - ${updatedClient._id} - client was updated!`);
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
    deleteClientById,
    isRegisteredEMail
}