const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please Provide A name"]
    },
    email:{
        type: String,
        required: [true, "Please Enter a email address"]
    },
    password:{
        type:String,
        required: [true, "Please enter a password"]
    },
    profile:{
        type: String,
        required: false
    }
}, {timestamps:true});

const User = new mongoose.model("User", userSchema);

module.exports = User;