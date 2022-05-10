const mongoose = require("mongoose");
const { MonitorUptime } = require('./monitorUptimeModel');
const { Site } = require('./siteModel');
const { Contact } = require('./contactModel');

const Insident = mongoose.model(
    "Insident",
    new mongoose.Schema({
        url: { type:String},
        status: { type: String, enum: ['OPENED','NOTIFIED','RESOLVED'], },
        monitorError: {type: mongoose.Schema.Types.ObjectId, ref: 'MonitorUptime'},
        site: {type: mongoose.Schema.Types.ObjectId, ref: Site},
        managars: [{type: mongoose.Schema.Types.ObjectId, ref: Contact}],
        statusDesc: {type:String}
    }, 
    {
        timestamps: { createdAt: 'createdAt' } 
    })
);

module.exports = {Insident};