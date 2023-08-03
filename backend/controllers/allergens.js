import Allergen from '../models/Allergen.js'
import createError from '../utils/error.js';

export const createAllergen = async (req, res, next) => {

    try {
        if (req.body.allergenName !== undefined && req.body.allergenName !== "") {
            req.body.lastManipulatorId = req.client.id;
            const newAllergen = new Allergen(req.body);
            const savedAllergen = await newAllergen.save();
            res.status(200).json(savedAllergen);
            console.log(`${savedAllergen.allergenName} - allergen has been saved!`);
        } else {
            return next(createError(403, "Wrong data (allergen name is wrong or missing!"));
        }
    }

    catch (error) {
        next(error);
    }
};

export const getAllergens = async (req, res, next) => {

    try {
        const allergens = (await Allergen.find()).filter((data) => data.isActive);
        if (allergens !== null) {
            res.status(200).json(allergens);
        } else {
            res.status(200).json("No allergens in the database!");
        }
    }

    catch (error) {
        next(error);
    }
};

export const getAllergenById = async (req, res, next) => {

    try {
        const currentAllergen = await Allergen.findById(req.params.id);
        if (currentAllergen !== null) {
            res.status(200).json(currentAllergen);
        } else {
            res.status(200).json("No allergen the given ID!");
        }

    } catch (error) {
        next(error);
    }
};

export const updateAllergenById = async (req, res, next) => {

    try {
        const actualAllergen = await Allergen.findById(req.params.id);
        if (actualAllergen !== null) {

            if (req.body.allergenName !== undefined && req.body.allergenName !== "") {
                req.body.lastManipulatorId = req.client.id;
                const updateAllergen = await Allergen.findByIdAndUpdate(
                    req.params.id,
                    { $set: req.body },
                    { new: true });

                res.status(200).json(updateAllergen);
                console.log(`${updateAllergen.allergenName} - ${updateAllergen._id} - has been updated!`);
            } else {
                return next(createError(403, "Wrong data (allergen name is wrong or missing!"));
            }
        } else {
            res.status(200).json("No allergen the given ID!");
        }
    }

    catch (error) {
        next(error);
    }
};

export const deleteAllergenById = async (req, res, next) => {

    try {
        const actualAllergen = await Allergen.findById(req.params.id);
        if (actualAllergen !== null) {
            const deletedAllergen = await Allergen.findByIdAndDelete(req.params.id);
            res.status(200).json(`${deletedAllergen._id} - allergen has been deleted!`);
            console.log(`${deletedAllergen._id} - allergen has been deleted!`);
        } else {
            res.status(200).json("No allergen the given ID!");
        }
    }

    catch (error) {
        next(error);
    }
};

export default {
    createAllergen,
    getAllergens,
    getAllergenById,
    updateAllergenById,
    deleteAllergenById,
}