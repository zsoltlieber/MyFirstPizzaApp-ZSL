import Client from '../models/Client.js';

export const register = async (req, res, next) => {

    try {
        const newClient = new Client({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        });
        
        await newClient.save()
        res.status(200).send("User has been created.")
        

    } catch (error) {
        next(error);
    }
}


export default register