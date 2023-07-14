import Client from '../models/Client.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res, next) => {

    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const newClient = new Client({
            clientName: req.body.clientName,
            password: hashedPassword
        });

        await newClient.save()
        res.status(200).send("User has been created.")


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

        res.status(200).json(client);

    } catch (error) {
        next(error);
    }
}

export default {
    register,
    login
}
