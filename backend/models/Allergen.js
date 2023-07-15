import mongoose from 'mongoose';

const { Schema } = mongoose;

const AllergenSchema = new Schema({
    clientId: {
        type: String,
        require: true
    }, 
    allergenName: {
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

export default mongoose.model("Allergens", AllergenSchema);