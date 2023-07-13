import mongoose from "mongoose";

const { Schema } = mongoose;

const OrderSchema = new Schema({
    orderId: Number,
    clientId: Number,
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

export default mongoose.model("orders", OrderSchema);