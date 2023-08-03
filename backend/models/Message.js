import mongoose from 'mongoose';

const { Schema } = mongoose;

const MessageSchema = new Schema({
    clientName: {
        type: String,
        require: true
    },
    message: {
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

export default mongoose.model("Messages", MessageSchema); 