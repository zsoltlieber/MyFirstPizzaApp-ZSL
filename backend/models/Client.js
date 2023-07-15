import mongoose from 'mongoose';

const { Schema } = mongoose;

const ClientSchema = new Schema({
    clientId: {
        type: String,                     //last modifier ID or initial ID
        default: "initial"
    },
    clientName: {
        type: String,
        require: true
    },
    email: String,
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    phoneNumber: [String],
    address: [
        {
            postCode: String,
            city: String,
            streetAndNumber: String,
            otherInfo: String
        },
    ],
    isActive: {
        type: Boolean,
        default: true
    },
    created: {
        type: Date,
        default: Date.now
    },
});

export default mongoose.model("Clients", ClientSchema);
