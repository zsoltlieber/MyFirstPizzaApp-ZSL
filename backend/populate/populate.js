import mongoose from 'mongoose';
import dotenv from "dotenv";

import AllergenModel from '../models/Allergen.js';
import PizzaTypeModel from '../models/PizzaType.js';
import ClientModel from '../models/Client.js';
import OrderModel from '../models/Order.js';
import MessageModel from '../models/Message.js';
import allergens from './allergens.json' assert {type: 'json'};
import pizzaTypes from './pizzaTypes.json' assert {type: 'json'};
import clients from './clients.json' assert {type: 'json'};
//import orders from './orders.json' assert {type: 'json'};  //Solution for import earlier orders from  !
import messages from './messages.json' assert {type: 'json'};

dotenv.config();

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

const populateClients = async () => {
    await ClientModel.deleteMany({});
    await ClientModel.create(...clients);
    console.log("Clients db created from json data");
}

const populateOrders = async () => {
    await OrderModel.deleteMany({});
    await OrderModel.create();              //Empty collection create
    //await OrderModel.create(...orders);   //Connection the earlier orders !
    console.log("Orders db created from json data");
}

const populateMessages = async () => {
    await MessageModel.deleteMany({});
    await MessageModel.create(...messages);
    console.log("Messages db created from json data");
}
const main = async () => {
    await mongoose.connect(mongoUrl);

    await populateAllergens();
    await populatePizzaTypes();
    await populateMessages();
    await populateOrders();
    await populateClients();

    await mongoose.disconnect();
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
