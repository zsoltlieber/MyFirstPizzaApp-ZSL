import Client from '../models/Client.js';
import bcrypt from 'bcryptjs';
import createError from '../utils/error.js';
import jwt from 'jsonwebtoken';

async function setLastManipulatorId(client, req, res, next) {
    //set lastManupulatorId into client data
    client.lastManipulatorId = client._id
    const modifiedClient = new Client(client);
    await modifiedClient.save();
}

export const login = async (req, res, next) => {

    try {
        const client = await Client.findOne({ clientName: req.body.clientName });
        if (!client) return next(createError(404, "Client not found!"));

        const isPasswordCorrect = bcrypt.compare(req.body.password, client.password);
        if (!isPasswordCorrect) return next(createError(400, "Wrong client name or password!"));
        setLastManipulatorId(client)

        const jwtToken = jwt.sign({ id: client._id, isAdmin: client.isAdmin, isMainAdmin: client.isMainAdmin }, process.env.JWT);

        res.cookie("access_token", jwtToken, {
            httpOnly: true,
        })
            .status(200)
            .json({ name: client.clientName, id: client._id });
        console.log(`name:${client.clientName} - id:${client._id} - client loged in!`);
    }

    catch (error) {
        next(error);
    }
}

export default {
    login,
}