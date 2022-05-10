const { InsidentEvent } = require("../models/insidentEventModel");

//create insident event
const createInsidentEvent = async (insidentEvent) => {
    try {
        const newInsidentEvent = await InsidentEvent.create(insidentEvent);
        return newInsidentEvent;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createInsidentEvent,
}