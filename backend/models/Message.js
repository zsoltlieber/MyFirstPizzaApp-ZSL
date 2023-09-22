import mongoose from 'mongoose';

const { Schema } = mongoose;

const MessageSchema = new Schema({
    clientName: {
        type: String,
        require: true,
    },
    clientId: {
        type: String,
        require: true,
        default: "initial"
    },
    message: {
        type: String,
        require: true
    },
    isActive: {
        type: Boolean,
        default: true
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

export default mongoose.model("Messages", MessageSchema); 