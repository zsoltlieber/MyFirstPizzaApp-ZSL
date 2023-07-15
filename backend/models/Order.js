import mongoose from "mongoose";

const { Schema } = mongoose;

const OrderSchema = new Schema({
    clientId: {                     //last modifier ID or initial ID
        type: String,
        require: true,
        default: "initial"
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
    created: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Orders", OrderSchema);