import Client from '../models/Client.js';
import bcrypt from 'bcryptjs';
import createError from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {

    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const newClient = new Client({
            clientName: req.body.clientName,
            password: hashedPassword
        });

        await newClient.save();
        res.status(200).json(`${newClient.clientName} - client was registered.`);
        console.log(`${newClient.clientName} - client was registered.`);

    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {

    try {
        const client = await Client.findOne({ clientName: req.body.clientName });
        if (!client) return next(createError(404, "Client not found!"));
        const isPasswordCorrect = await bcrypt.compare(req.body.password, client.password);
        if (!isPasswordCorrect) return next(createError(400, "Wrong client name or password!"));

        const jwtToken = jwt.sign({ id: client._id, isAdmin: client.isAdmin }, process.env.JWT);

        res
            .cookie("access_token", jwtToken, {
                httpOnly: true,
            })
            .status(200)
            .json(`${client.clientName} - client loged in!`);
        console.log(`${client.clientName} - client loged in!`);

    } catch (error) {
        next(error);
    }
}

export default {
    register,
    login,
}
