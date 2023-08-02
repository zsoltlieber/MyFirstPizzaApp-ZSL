import mongoose from "mongoose";

const { Schema } = mongoose;

const PizzaTypeSchema = new Schema({
    pizzaName: {
        type: String,
        require: true
    },
    ingredients: [String],
    price: {
        type: Number,
        require: true
    },
    allergens: [String],
    src: {
        type: String,
        require: true
    },
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

export default mongoose.model("Pizzatypes", PizzaTypeSchema);