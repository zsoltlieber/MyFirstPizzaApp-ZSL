import mongoose from 'mongoose';

const { Schema } = mongoose;

const ClientSchema = new Schema({
    clientName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        requre: true
    },
    password: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        require: true
    },
    address: [{
        postCode: String,
        city: String,
        streetAndNumber: String,
        otherInfo: String
    }],

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
    lastManipulatorId: {                     
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
