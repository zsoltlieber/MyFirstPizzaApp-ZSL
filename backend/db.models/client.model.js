const mongoose = require("mongoose");

const { Schema } = mongoose;

const ClientSchema = new Schema({
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
});

module.exports = mongoose.model("Clients", ClientSchema);
