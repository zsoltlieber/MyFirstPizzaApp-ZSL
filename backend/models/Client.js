import mongoose from 'mongoose';

const { Schema } = mongoose;

const ClientSchema = new Schema({
    clientId: String,
    firstName: {
        type: String,
        required: true
    },
    middleName: String,
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: [String],
    address: [
        {
            postCode: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            streetAndNumber: {
                type: String,
                required: true
            },
            otherInfo: String
        },
    ],
    created: {
        type: Date,
        default: Date.now
    },
});

export default mongoose.model("Client", ClientSchema);
