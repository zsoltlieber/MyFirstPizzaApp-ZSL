require("dotenv").config();
const mongoose = require("mongoose");

const allergens = require("./allergens.json");
const menu = require("./pizzaTypes.json");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
    console.error("Missing MONGO_URL environment variable");
    process.exit(1); // exit program
}
/*
const populateClietns = async () => {
    await EmployeeModel.deleteMany({});
    clientId: String,
        firstName: String,
            middleName: String,
                lastName: String,
                    email: String,
                        password: String,
                            phoneNumber: [String],
                                address: [
                                    {
                                        postCode: String,
                                        city: String,
                                        streetAndNumber: String,
                                        otherInfo: String
                                    },
                                ],
                                    created: {
        type: Date,
        default: Date.now,
    },
    const employees = names.map(splitName).map((name) => ({
        ...name,
        startingDate: pick(startingDate),
        salary: pick(salary),
        desiredSalary: pick(desiredSalary),
        favouriteColor: "#" + ("00000" + Math.floor(Math.random() * Math.pow(16, 6)).toString(16)).slice(-6),
        level: pick(levels),
        position: pick(positions),
        division: ""
    }));

    await EmployeeModel.create(...employees);
    console.log("Clietns created");
};
*/
const main = async () => {
    await mongoose.connect(mongoUrl);

    await populateAllergens();
    await populatePizzaTypes();
    await populateClietns();
    await mongoose.disconnect();
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
