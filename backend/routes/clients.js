import express from 'express';
import Client from '../models/Client.js'

const clientsRouter = express.Router();


clientsRouter.post("/", async (req, res) => {
    
    const newClient = new Client(req.body);
    
    try {
        const savedClient = await newClient.save();
        res.status(200).json(savedClient);
        console.log(`${savedClient.clientId + " " + savedClient.firstName + " " + savedClient.lastName} client has been saved!`);
  
    } catch (error) {
        res.status(500).json(error);
    }
});

clientsRouter.put("/:id", async (req, res) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedClient);
        console.log(`${updatedClient.clientId + " " + updatedClient.firstName + " " + updatedClient.lastName} has been updated!`);
  
    } catch (error) {
        res.status(500).json(error);
    }
});

clientsRouter.delete("/:id", async (req, res) => {
    try {
        await Client.findByIdAndDelete(req.params.id);
        res.status(200).json(`${req.params.id} client has been deleted!`);
        console.log(`${req.params.id} client has been deleted!`);
 
    } catch (error) {
        res.status(500).json(error);
    }
});

clientsRouter.get("/:id", async (req, res) => {
    try {
        const actualClient = await Client.findById(req.params.id);
        res.status(200).json(actualClient);

    } catch (error) {
        res.status(500).json(error);   
    }
});

clientsRouter.get("/", async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);

    } catch (error) {
        res.status(500).json(error);
    }
});

export default clientsRouter;