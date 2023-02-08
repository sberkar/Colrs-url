const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Url", urlSchema)