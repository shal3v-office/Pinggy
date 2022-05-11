const { InsidentEvent } = require("../models/insidentEventModel");

//create insidentEvent
const createInsidentEvent = async(insidentEvent) => {
    try {
        const insidentEventCreated = await InsidentEvent.create(insidentEvent);
        return insidentEventCreated;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createInsidentEvent,
}