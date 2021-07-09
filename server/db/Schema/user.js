const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    uname: {
        type: String,
        required: true
    },
    contactno: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("user", userSchema);
module.exports = User;