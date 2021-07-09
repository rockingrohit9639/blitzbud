const mongoose = require("mongoose");

const managerSchema = mongoose.Schema({
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
        default: "MANAGER"
    }
});

const Manager = mongoose.model("manager", managerSchema);
module.exports = Manager;