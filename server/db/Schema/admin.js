const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "ADMIN"
    }
});

const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;