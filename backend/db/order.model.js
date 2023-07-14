const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrderSchema = new Schema({
    clientId: String,
    orderedItems: [{
        pizzaId: String,
        pricePerEach: Number,
        quantity: Number
    }],
    created: Date,
    default: Date.now,
});

module.exports = mongoose.model("Order", OrderSchema);