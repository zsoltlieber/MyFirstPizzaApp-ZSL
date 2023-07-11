const mongoose = require("mongoose");

const { Schema } = mongoose;

const OpinionLetterSchema = new Schema({
    clientId: String,
    clientName: String,
    opinionLetter: String,
    created: Date,
    default: Date.now,
});

module.exports = mongoose.model("OpinionLetter", OpinionLetterSchema); 