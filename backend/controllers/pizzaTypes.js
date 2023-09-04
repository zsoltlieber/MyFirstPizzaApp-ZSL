import PizzaType from "../models/PizzaType.js";

export const createPizzaType = async (req, res, next) => {
    
    try {
        req.body.lastManipulatorId = req.client.id;
        
        const newPizzaType = new PizzaType(req.body);
        const savedPizzaType = await newPizzaType.save();
        res.status(200).json(savedPizzaType);
        console.log(`${savedPizzaType.pizzaName} - ${savedPizzaType._id} - pizza type was saved!`);
    }
    
    catch (error) {
        next(error);
    }
};

export const getPizzaTypes = async (req, res, next) => {

    try {
        let pizzaTypes = null;
        pizzaTypes = await PizzaType.find();
        if (req.query.isActive === 'true') {
            pizzaTypes = pizzaTypes.filter((data) => data.isActive === true);
        } else if (req.query.isActive === 'false') {
            pizzaTypes = pizzaTypes.filter((data) => data.isActive === false);
        }
        if (pizzaTypes !== null) {
            res.status(200).json(pizzaTypes);
        } else {
            res.status(200).json("No pizza types in the database!");
        }
    }
    
    catch (error) {
        next(error);
    }
};

export const getPizzaTypeById = async (req, res, next) => {

    try {
        const actualPizzaType = await PizzaType.findById(req.params.id);
        res.status(200).json(actualPizzaType);
    }
    
    catch (error) {
        next(error);
    }
};

export const updatePizzaTypeById = async (req, res, next) => {

    try {
        req.body.lastManipulatorId = req.client.id;
        const updatePizzaType = await PizzaType.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatePizzaType);
        console.log(`${updatePizzaType.pizzaName} - ${updatePizzaType._id} - pizza type was updated!`);
    }
    
    catch (error) {
        next(error);
    }
};

export const deletePizzaTypeById = async (req, res, next) => {

    try {
        await PizzaType.findByIdAndDelete(req.params.id);
        res.status(200).json(`${req.params.id} - pizza type was deleted!`);
        console.log(`${req.params.id} - pizza type was deleted!`);
    }
    
    catch (error) {
        next(error);
    }
};

export default {
    createPizzaType,
    getPizzaTypes,
    getPizzaTypeById,
    updatePizzaTypeById,
    deletePizzaTypeById
}