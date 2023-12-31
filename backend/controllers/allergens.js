import Allergen from '../models/Allergen.js'
import createError from '../utils/error.js';

export const createAllergen = async (req, res, next) => {

    try {
        if (req.body.allergenName && req.body.allergenName !== "") {
            req.body.lastManipulatorId = req.client.id;
            const newAllergen = new Allergen(req.body);
            const savedAllergen = await newAllergen.save();
            res.status(200).json(savedAllergen);
            console.log(`${savedAllergen.allergenName} - allergen was saved!`);
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
        let allergens = null;
        allergens = await Allergen.find();
        allergens.sort((a, b) => {
            if (a.allergenName < b.allergenName) {
                return -1;
            }

            if (a.allergenName > b.allergenName) {
                return 1;
            }

            return 0;
        });

        if (req.query.isActive === 'true') {
            allergens = allergens.filter((data) => data.isActive === true);
        } else if (req.query.isActive === 'false') {
            allergens = allergens.filter((data) => data.isActive === false);
        }
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

            if (req.body.allergenName && req.body.allergenName !== "") {
                req.body.lastManipulatorId = req.client.id;
                const updateAllergen = await Allergen.findByIdAndUpdate(
                    req.params.id,
                    { $set: req.body },
                    { new: true });

                res.status(200).json(updateAllergen);
                console.log(`${updateAllergen.allergenName} - ${updateAllergen._id} - allergen was updated!`);
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
            if (req.client.isMainAdmin) {
                const deletedAllergen = await Allergen.findByIdAndDelete(req.params.id);
                res.status(200).json(`${deletedAllergen._id} - allergen was deleted!`);
                console.log(`${deletedAllergen._id} - allergen was deleted!`);
            }
            else {
                req.body = actualAllergen;
                req.body.lastManipulatorId = req.client.id;
                req.body.isActive = false;

                const updateAllergen = await Allergen.findByIdAndUpdate(
                    req.params.id,
                    { $set: req.body },
                    { new: true });

                res.status(200).json(updateAllergen);
                console.log(`${updateAllergen.allergenName} - ${updateAllergen._id} - has was updated!`);
            }
        }
        else {
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