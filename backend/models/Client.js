import mongoose from 'mongoose';

const { Schema } = mongoose;

const ClientSchema = new Schema({
    clientId: Number,
    firstName: {
        type: String,
        require: true,
        unique: true
    },
    middleName: String,
    lastName: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false
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

export default mongoose.model("Clients", ClientSchema);
