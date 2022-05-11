const mongoose = require("mongoose");
const { Site } = require('./siteModel');
const insidentController = require("../controllers/insidentController");

const MonitorUptime = mongoose.model(
    "MonitorUptime",
    new mongoose.Schema({
        url: { type:String},
        status: { type: Number },
        site: {type: mongoose.Schema.Types.ObjectId, ref: Site},
        firstOfSite: {type: Boolean}
    }, 
    {
        timestamps: { createdAt: 'createdAt' } 
    })
);

const changeStream = MonitorUptime.watch().on('change', async(change) => {
    try {
        if(change.fullDocument.status >= 400){
            const insident = await insidentController.newInsident(change);
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = {MonitorUptime};