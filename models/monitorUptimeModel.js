const mongoose = require("mongoose");
const { Site } = require('./siteModel');

const MonitorUptime = mongoose.model(
    "MonitorUptime",
    new mongoose.Schema({
        url: { type:String},
        status: { type: Number },
        site: {type: mongoose.Schema.Types.ObjectId, ref: Site},
    }, 
    {
        timestamps: { createdAt: 'createdAt' } 
    })
);
module.exports = {MonitorUptime};