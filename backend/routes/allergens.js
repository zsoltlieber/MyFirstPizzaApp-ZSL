import express from 'express';
import Allergen from "../models/Allergen.js";

const allergensRouter = express.Router();


allergensRouter.post("/", async (req, res) => {
    const newAllergen = new Allergen(req.body);
    
    try {
        const savedAllergen = await newAllergen.save();
        res.status(200).json(savedAllergen);
    } catch (error) {
        res.status(500).json(error);
    }
});

allergensRouter.put("/:id", async (req, res) => {
    try {
        const updateAllergen = await Allergen.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true })
        res.status(200).json(updateAllergen);
        
    } catch (error) {
        res.status(500).json(error);
    }
});

allergensRouter.delete("/:id", async (req, res) => {
    try {
        await Allergen.findByIdAndDelete(req.params.id)
        res.status(200).json("Allergen has been deleted");

    } catch (error) {
        res.status(500).json(error);
    }
});

allergensRouter.get("/:id", async (req, res) => {
    try {
        const currentAllergen = await Allergen.findById(req.params.id)
        res.status(200).json(currentAllergen);

    } catch (error) {
        res.status(500).json(error);
    }
});

allergensRouter.get("/", async (req, res) => {
    try {
        const allergens = await Allergen.find()
        res.status(200).json(allergens);

    } catch (error) {
        res.status(500).json(error);
    }
});

export default allergensRouter;