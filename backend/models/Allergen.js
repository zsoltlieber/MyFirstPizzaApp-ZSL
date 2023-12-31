import mongoose from 'mongoose';

const { Schema } = mongoose;

const AllergenSchema = new Schema({
    allergenName: {
        type: String,
        require: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isChecked: {
        type: Boolean,
        default: false
    },
    lastManipulatorId: {                     
        type: String,
        require: true,
        default: "initial"
    },
    created: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Allergens", AllergenSchema);