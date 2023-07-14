import express from 'express';
import PizzaType from '../models/PizzaType.js'

const pizzaTypesRouter = express.Router();

pizzaTypesRouter.post("/", async (req, res) => {

    const newPizzaType = new PizzaType(req.body);

    try {
        const savedPizzaType = await newPizzaType.save();
        res.status(200).json(savedPizzaType);
        console.log(`${savedPizzaType.pizzaId + " - " + savedPizzaType.pizzaName} has been saved!`);

    } catch (error) {
        res.status(500).json(error);
    }
});

pizzaTypesRouter.put("/:id", async (req, res) => {
    try {
        const updatePizzaType = await PizzaType.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatePizzaType);
        console.log(`${updatePizzaType.pizzaId + " - " + updatePizzaType.pizzaName} has been updated!`);
    
    } catch (error) {
        res.status(500).json(error);
    }
});


pizzaTypesRouter.delete("/:id", async (req, res) => {
    try {
        await PizzaType.findByIdAndDelete(req.params.id);
        res.status(200).json(`${req.params.id} pizzaType has been deleted!`);
        console.log(`${req.params.id} pizzaType has been deleted!`);

    } catch (error) {
        res.status(500).json(error);
    }
});

pizzaTypesRouter.get("/:id", async (req, res) => {
    try {
        const actualPizzaType = await PizzaType.findById(req.params.id);
        res.status(200).json(actualPizzaType);
    
    } catch (error) {
        res.status(500).json(error);
    }
});

pizzaTypesRouter.get("/", async (req, res) => {
    try {
        const pizzaTypes = await PizzaType.find();
        res.status(200).json(pizzaTypes);
    
    } catch (error) {
        res.status(500).json(error);
    }
});

export default pizzaTypesRouter;