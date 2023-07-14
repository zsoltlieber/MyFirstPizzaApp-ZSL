import mongoose from 'mongoose';

const { Schema } = mongoose;

const ClientSchema = new Schema({
    clientId: Number,
    firstName: {
        type: String,
        require: true
    },
    middleName: String,
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    phoneNumber: [String],
    address: [
        {
            postCode: {
                type: String,
                require: true
            },
            city: {
                type: String,
                require: true
            },
            streetAndNumber: {
                type: String,
                require: true
            },
            otherInfo: String
        },
    ],
    created: {
        type: Date,
        default: Date.now
    },
});

export default mongoose.model("clients", ClientSchema);
