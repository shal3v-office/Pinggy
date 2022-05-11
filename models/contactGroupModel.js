const mongoose = require("mongoose");
const { Site } = require('./siteModel');
const { Contact } = require('./contactModel');

const Group = mongoose.model(
    "Group",
    new mongoose.Schema({
        site: {type: mongoose.Schema.Types.ObjectId, ref: Site},
        contacts: [{type: mongoose.Schema.Types.ObjectId, ref: Contact}],
        onCallContacts: [{type: mongoose.Schema.Types.ObjectId, ref: Contact}],
    }, 
    {
        timestamps: { createdAt: 'createdAt' } 
    })
);
module.exports = {Group};