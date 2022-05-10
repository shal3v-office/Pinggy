const { Insident } = require("../models/insidentModel");

//create insident
const newInsident = async(insident) => {
    try {
        const insidentCreated = await Insident.create(insident);
        return insidentCreated;
    } catch (error) {
        console.log(error);
    }
};

//get All opened insidents by site id
const getOpenedInsidentBySiteId = async(siteId) => {
    try {
        return await Insident.find({ site: siteId, status:"OPENED" });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    newInsident,
    getOpenedInsidentBySiteId,
}