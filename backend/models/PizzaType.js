import mongoose from "mongoose";

const { Schema } = mongoose;

const PizzaTypeSchema = new Schema({
    pizzaId: Number,
    pizzaName: String,
    ingredients: [String],
    price: Number,
    allergens: [Number],
    src: String    
});

export default mongoose.model("Pizzatypes", PizzaTypeSchema);