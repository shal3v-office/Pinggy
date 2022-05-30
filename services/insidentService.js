const mongoose = require("mongoose");
const { Insident } = require("../models/insidentModel");

//create insident
const createOrUpdateInsident = async(insident,insidentId) => {
    try {
        let filter = {_id:insident._id};
        if(insidentId == 0) filter = {_id:mongoose.Types.ObjectId()};
        const insidentCreated = await Insident.findOneAndUpdate(filter , insident, {
            new: true,
            upsert: true,
            runValidators: true,
            setDefaultsOnInsert: true,
          }).populate("managars").populate("site");
        return insidentCreated;
    } catch (error) {
        console.log(error);
    }
};

//get All opened insidents by site id
const getOpenedInsidentBySiteId = async(siteId) => {
    try {
        return await Insident.find({ site: siteId, status: { $ne: "RESOLVED" } });
    } catch (error) {
        console.log(error);
    }
};

//get insident by id
const getInsidentById = async(insidentId) => {
    try {
        return await Insident.find({ _id: insidentId});
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createOrUpdateInsident,
    getOpenedInsidentBySiteId,
    getInsidentById,
}