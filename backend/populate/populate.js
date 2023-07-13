import mongoose from 'mongoose';
import dotenv from "dotenv";

import AllergenModel from '../models/Allergen.js';
import PizzaTypeModel from '../models/PizzaType.js';
import allergensData from './allergens.json' assert {type: 'json'};
import pizzaTypesData from './pizzaTypes.json' assert {type: 'json'};

dotenv.config();
const allergens = allergensData.allergens;
const pizzaTypes = pizzaTypesData.pizzaTypes;

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
    console.error("Missing MONGO_URL environment variable");
    process.exit(1); // exit program
}

const populateAllergens = async () => {
    await AllergenModel.deleteMany({});
    await AllergenModel.create(...allergens);
    console.log("Allergens db created from json data");
}

const populatePizzaTypes = async () => {
    await PizzaTypeModel.deleteMany({});
    await PizzaTypeModel.create(...pizzaTypes);
    console.log("Pizzatypes db created from json data");
}

const main = async () => {
    await mongoose.connect(mongoUrl);

    await populateAllergens();
    await populatePizzaTypes();

    await mongoose.disconnect();
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
