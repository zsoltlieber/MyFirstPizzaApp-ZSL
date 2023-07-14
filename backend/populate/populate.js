require("dotenv").config();
const mongoose = require("mongoose");

const allergens = require("./allergens.json");
const menu = require("./pizzaTypes.json");
const { populate } = require("dotenv");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
    console.error("Missing MONGO_URL environment variable");
    process.exit(1); // exit program
}

const main = async () => {
    await mongoose.connect(mongoUrl);

    await populateAllergens();
    await populatePizzaTypes();
    await populateClietns();
    await populateOrders();
    await populateMessages();
    
    await mongoose.disconnect();
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
