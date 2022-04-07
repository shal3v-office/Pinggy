const mongoose = require("mongoose");
const { Customer } = require('./customerModel');

const Site = mongoose.model(
    "Site",
    new mongoose.Schema({
        name: { type:String},
        mainURL: { type: String },
        customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
        innerLinks: [{type:String}]
    })
);
module.exports = {Site};