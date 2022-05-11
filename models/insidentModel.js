const mongoose = require("mongoose");
const { MonitorUptime } = require('./monitorUptimeModel');
const { Site } = require('./siteModel');
const { Contact } = require('./contactModel');
// const insidentEventController = require("../controllers/insidentEventController");
const insidentEventService = require("../services/insidentEventService");
const insidentService = require("../services/insidentService");

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

const changeStream = Insident.watch().on('change', async(change) => {
    try {
        console.log("insitent change", change);
        if(change.operationType != "delete"){
            // const insidentEvent = await insidentEventController.createInsidentEvent(change.documentKey._id);
            var insidentId = change.documentKey._id;
            // const insident = await insidentService.getInsidentById(insidentId);
            const insident = await Insident.findById({ _id: insidentId});
            console.log("insident",insident);
            const newInsidentEvent = {
                insident: insidentId,
                status: insident.status,
                site: insident.site,
                managars: insident.managars,
                description: insident.statusDesc
            };
            const insidentEvent = await insidentEventService.createInsidentEvent(newInsidentEvent);
            console.log("insident event", insidentEvent);
            return insidentEvent
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = {Insident};