const mongoose = require("mongoose");
const { Site } = require('./siteModel');

const Monitor = mongoose.model(
    "Monitor",
    new mongoose.Schema({
        url: { type:String},
        status: { type: Number },
        site: {type: mongoose.Schema.Types.ObjectId, ref: Site},
    }, 
    {
        timestamps: { createdAt: 'createdAt' } 
    })
);
module.exports = {Monitor};