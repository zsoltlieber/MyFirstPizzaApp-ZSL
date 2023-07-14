import mongoose from 'mongoose';

const { Schema } = mongoose;

const AllergenSchema = new Schema({
    allergenId: Number,
    allergenName: {
        type: String,
        require: true
    }, 
    created: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Allergens", AllergenSchema);