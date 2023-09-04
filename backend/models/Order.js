import mongoose from "mongoose";

const { Schema } = mongoose;

const OrderSchema = new Schema({
    orderClientId: {
        type: String,
        require: true
    },
    orderedItems: [{
        pizzaId: {
            type: String,
            require: true
        },
        pricePerEach: {
            type: Number,
            min: 1
        },
        quantity: Number,
        isInProcess: {
            type: Boolean,
            default: false
        },
        isReady: {
            type: Boolean,
            default: false
        }
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    lastManipulatorId: {                     //last modifier ID or initial ID
        type: String,
        require: true,
        default: "initial"
    },
    created: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Orders", OrderSchema);