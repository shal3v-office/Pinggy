const mongoose = require("mongoose");
const { Site } = require('./siteModel');
const { Insident } = require('./insidentModel');
const { Contact } = require('./contactModel');

const InsidentEvent = mongoose.model(
    "InsidentEvent",
    new mongoose.Schema({
        insident: {type: mongoose.Schema.Types.ObjectId, ref: 'Insident'},
        status: { type: String, enum: ['OPENED','NOTIFIED','RESOLVED'], },
        site: {type: mongoose.Schema.Types.ObjectId, ref: Site},
        managars: [{type: mongoose.Schema.Types.ObjectId, ref: Contact}],
        description: {type: String}
    }, 
    {
        timestamps: { createdAt: 'createdAt' } 
    })
);

module.exports = {InsidentEvent};