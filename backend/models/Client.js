import mongoose from 'mongoose';

const { Schema } = mongoose;

const ClientSchema = new Schema({
    clientUuid: {
        type: String,
        require: true
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
    isAdmin: {
        type: Boolean,
        default: false
    },
    isMainAdmin: {
        type: Boolean,
        default: false
    },
    lastManipulatorId: {                     //last modifier ID or initial ID
        type: String,
        require: true,
        default: "initial"
    },
    created: {
        type: Date,
        default: Date.now
    },
});

export default mongoose.model("Clients", ClientSchema);
