import mongoose from 'mongoose';

const { Schema } = mongoose;

const AllergenSchema = new Schema({
    clientId: {                     //last modifier ID or initial ID
        type: String, 
        require: true, 
        default: "initial"
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