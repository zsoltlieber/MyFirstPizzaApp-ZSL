import mongoose from "mongoose";

const { Schema } = mongoose;

const OrderSchema = new Schema({
    clientId: {
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
    created: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Orders", OrderSchema);