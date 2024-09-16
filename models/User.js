const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        trim: true, // This will automatically remove leading/trailing whitespace
        validate: {
        validator: function (v) {
            return !/\s/.test(v); // Ensures no whitespace in the username
        },
        message: (props) =>
            `${props.value} contains spaces, which are not allowed!`,
        },
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
});

module.exports = mongoose.model("User", formSchema);
