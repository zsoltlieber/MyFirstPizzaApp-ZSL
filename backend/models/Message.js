import mongoose from 'mongoose';

const { Schema } = mongoose;

const MessageSchema = new Schema({
    clientId: {
        type: String,
        require: true
    }, 
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
    created: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Messages", MessageSchema); 