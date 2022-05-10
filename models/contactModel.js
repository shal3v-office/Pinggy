const mongoose = require("mongoose");
const { Site } = require('./siteModel');
const { User } = require('./userModel');

const Contact = mongoose.model(
    "Contact",
    new mongoose.Schema({
        name: {type: String},
        email: {type: String},
        phone: {type: String},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        site: {type: mongoose.Schema.Types.ObjectId, ref: Site},
        isOnCall: {type: Boolean}
    }, 
    {
        timestamps: { createdAt: 'createdAt' } 
    })
);
module.exports = {Contact};