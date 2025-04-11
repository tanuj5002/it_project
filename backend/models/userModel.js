const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullName:{
        type:String,
        required:[true, "Full Name is required"]
    },
    phone:{
        type:String,
        required:[true, "Phone number is required"]
    },
    email:{
        type:String,
        required:[true, "Email is mandatory"],
        unique:[true, "Email must be unique"]
    },
    password:{
        type:String,
        required:[true, "Password is mandatory"]
    },
    listings:[{type:mongoose.Schema.Types.ObjectId, ref:'listing'}],
    savedItems:[{type:mongoose.Schema.Types.ObjectId, ref:'lisiting'}]
}, {timestamps:true})

module.exports = mongoose.model("user", userSchema);