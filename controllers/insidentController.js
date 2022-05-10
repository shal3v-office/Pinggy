const insidentEventService = require("../services/insidentEventService");
const createInsident = require('../lib/functions/createInsident.js');

const newInsident = async(change) => {
    try {
        const insident = await createInsident(change);
        if(insident){
            var newInsidentEvent = {
                insident: insident._id,
                status: insident.status,
                site: insident.site,
                managars: insident.managars,
                description: "insident created"
            };
            const insidentEvent = await insidentEventService.createInsidentEvent(newInsidentEvent);    
        }
        return insident;
    } catch (err) {
        return "Internal Server Error";
    }
};

module.exports = {
    newInsident,
};