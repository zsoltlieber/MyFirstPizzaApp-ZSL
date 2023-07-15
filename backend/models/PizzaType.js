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
    allergens: [Number],
    src: {
        type: String,
        require: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Pizzatypes", PizzaTypeSchema);