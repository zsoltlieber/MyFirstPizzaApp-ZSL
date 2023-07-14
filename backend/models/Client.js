import mongoose from 'mongoose';

const { Schema } = mongoose;

const ClientSchema = new Schema({
    clientId: Number,
    clientName: String,
    email: String,
    password: String,
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
    created: {
        type: Date,
        default: Date.now
    },
});

export default mongoose.model("Clients", ClientSchema);
