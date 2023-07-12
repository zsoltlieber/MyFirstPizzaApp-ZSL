import mongoose from 'mongoose';
import dotenv from "dotenv";
import AllergenModel from '../models/Allergen';
dotenv.config();

const allergens = require("./allergens.json");
const menu = require("./pizzaTypes.json");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
    console.error("Missing MONGO_URL environment variable");
    process.exit(1); // exit program
}

const populateAllergens = async () => {
    await AllergenModel.deleteMany({});
    await AllergenModel.create(allergens)
    console.log("Allergens created");
}

const main = async () => {
    await mongoose.connect(mongoUrl);
    
    await populateAllergens();
   // await populatePizzaTypes();
   // await populateClietns();
    await mongoose.disconnect();
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
