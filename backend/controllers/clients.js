import Client from '../models/Client.js';
import bcrypt from 'bcryptjs';
import createError from '../utils/error.js';

const isEmailExist = async (actualClientEmail) => {
    const clients = await Client.find();
    const clientsEmailList = clients.map(client => client.email);
    return clientsEmailList.includes(actualClientEmail)
}

export const registerClient = async (req, res, next) => {
    const actualClientEmail = req.body.email;
    let mailIsExist = [0];
    const promise = isEmailExist(actualClientEmail);
    promise.then((data) => { saveClient(data) });

    async function saveClient(mailIsExist) {

        try {
            if (!mailIsExist &&
                req.body.clientName &&
                req.body.password &&
                req.body.email &&
                req.body.phoneNumber &&
                req.body.address
            ) {
                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(req.body.password, salt);

                const newClient = new Client(req.body);
                newClient.password = hashedPassword;

                await newClient.save();
                res.status(200).json(newClient);
                console.log(`${newClient.clientName} - ${newClient._id} - client was registered.`);

            }
            else {
                console.log("The email had been registered!")
                return next(createError(500, "The email had been registered! Use log in, or register another email!"))
            }
        }
        catch (error) {
            next(error);
        }
    }
    };

    export const getClients = async (req, res, next) => {

        try {
            let clients = null;

            clients = await Client.find();
            clients.sort((a, b) => {
                if (a.clientName < b.clientName) {
                    return -1;
                }

                if (a.clientName > b.clientName) {
                    return 1;
                }

                return 0;
            });

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
            if (req.body.password === "") {
                req.body.password = actualClient.password;
            }
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);
            req.body.password = hashedPassword;

            if (actualClient !== null) {
                if (req.body.clientName || req.body.clientName !== "") {
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
                if (!actualClient.isMainAdmin) {
                    await Client.findByIdAndDelete(req.params.id);
                    res.status(200).json(`${req.params.id} - client was deleted!`);
                    console.log(`${req.params.id} - client was deleted!`);
                }
                else { return next(createError(403, "Not allowed to access that client data!")) }
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