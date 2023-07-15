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
    created: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Messages", MessageSchema); 