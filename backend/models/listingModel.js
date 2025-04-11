const mongoose = require("mongoose")

const listingSchema  = mongoose.Schema({
    seller:{type:mongoose.Schema.Types.ObjectId, ref:'user'},
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    condition: { type: String, enum: ["New", "Like New", "Used"], required: true },
    category: { type: String, required: true },
    status: { type: String, enum: ["Available", "Sold"], default: "Available" }, // Track sold status
    createdAt: { type: Date, default: Date.now },
    image:{
        data: { type: String },           // filename like "abc123.png"
        contentType: { type: String },    // mimetype like "image/png"
    },
    //buying details
    buyer:{type:mongoose.Schema.Types.ObjectId, ref:'user'},
    soldAt:{type: Date }
})

module.exports = mongoose.model('listing', listingSchema);