import mongoose from "mongoose";

const { Schema } = mongoose;

const OrderSchema = new Schema({
    clientId: String,
    orderedItems: [{
        pizzaId: {
            type: String,
            require: true
        },
        pricePerEach: {
            type: Number,
            min: 1
        },
        quantity: Number
    }],
    created: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Order", OrderSchema);