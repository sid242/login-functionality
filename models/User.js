const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    verifytoken: {
        type: String,
    }
});
userSchema.set('timestamps', true)

const User = mongoose.model("User", userSchema);
// User.createIndexes();
module.exports = User;