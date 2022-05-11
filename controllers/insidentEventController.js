const insidentEventService = require("../services/insidentEventService");
const insidentService = require("../services/insidentService");

const createInsidentEvent = async (insidentId) => {
    try {
        const insident = await insidentService.getInsidentById(insidentId);
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
    } catch (err) {
        return "Internal Server Error";
    }
};

module.exports = {
    createInsidentEvent,
};