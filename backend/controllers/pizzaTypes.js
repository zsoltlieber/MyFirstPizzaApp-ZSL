import PizzaType from "../models/PizzaType.js";

export const createPizzaType = async (req, res, next) => {

    const newPizzaType = new PizzaType(req.body);

    try {
        const savedPizzaType = await newPizzaType.save();
        res.status(200).json(savedPizzaType);
        console.log(`${savedPizzaType.pizzaId + " - " + savedPizzaType.pizzaName} pizzatype has been saved!`);

    } catch (error) {
        next(error);
    }
};

export const updatePizzaType = async (req, res, next) => {
    try {
        const updatePizzaType = await PizzaType.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatePizzaType);
        console.log(`${updatePizzaType.pizzaId + " - " + updatePizzaType.pizzaName} has been updated!`);

    } catch (error) {
        next(error);
    }
};

export const deletePizzaType = async (req, res, next) => {
    try {
        await PizzaType.findByIdAndDelete(req.params.id);
        res.status(200).json(`${req.params.id} pizzaType has been deleted!`);
        console.log(`${req.params.id} pizzaType has been deleted!`);

    } catch (error) {
        next(error);
    }
};

export const getPizzaTypes = async (req, res, next) => {
    try {
        const pizzaTypes = await PizzaType.find();
        res.status(200).json(pizzaTypes);

    } catch (error) {
        next(error);
    }
};

export const getPizzaType = async (req, res, next) => {
    try {
        const actualPizzaType = await PizzaType.findById(req.params.id);
        res.status(200).json(actualPizzaType);

    } catch (error) {
        next(error);
    }
};

export default {
    createPizzaType,
    updatePizzaType,
    deletePizzaType,
    getPizzaTypes,
    getPizzaType
}