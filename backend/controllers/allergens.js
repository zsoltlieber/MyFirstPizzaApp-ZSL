import Allergen from '../models/Allergen.js'

export const createAllergen = async (req, res, next) => {

    const newAllergen = new Allergen(req.body);

    try {
        const savedAllergen = await newAllergen.save();
        res.status(200).json(savedAllergen);
        console.log(`${savedAllergen.allergenId + " - " + savedAllergen.allergenName} has been saved!`);

    } catch (error) {
        next(error);
    }
};

export const updateAllergen = async (req, res, next) => {
    try {
        const updateAllergen = await Allergen.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true });
        res.status(200).json(updateAllergen);
        console.log(`${updateAllergen.allergenId + " - " + updateAllergen.allergenName} has been updated!`);

    } catch (error) {
        next(error);
    }
};

export const deleteAllergen = async (req, res, next) => {
    try {
        await Allergen.findByIdAndDelete(req.params.id);
        res.status(200).json(`${req.params.id} allergen has been deleted!`);
        console.log(`${req.params.id} allergen has been deleted!`);

    } catch (error) {
        next(error);
    }
};

export const getAllergens = async (req, res, next) => {
    try {
        const allergens = await Allergen.find();
        res.status(200).json(allergens);

    } catch (error) {
        next(error);
    }
};

export const getAllergen = async (req, res, next) => {
    try {
        const currentAllergen = await Allergen.findById(req.params.id);
        res.status(200).json(currentAllergen);

    } catch (error) {
        next(error);
    }
};

export default {
    createAllergen,
    updateAllergen,
    deleteAllergen,
    getAllergen,
    getAllergens
}
