const mongoose = require("mongoose");
const { User } = require('./userModel');
const { Site } = require('./siteModel');

const Customer = mongoose.model(
    "Customer",
    new mongoose.Schema({
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        sites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Site'}]
    })
);
module.exports = {Customer};