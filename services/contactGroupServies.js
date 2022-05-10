const { Group } = require("../models/contactGroupModel");
const { Contact } = require("../models/contactModel");


//add new Group 
const createGroup = async(newGroup) => {
    try {
        const groupCreated = await Group.create(newGroup);
        return groupCreated;
    } catch (error) {
        console.log(error);
    }
};

//get All groups by site id
const getGroupsBySiteId = async(siteId) => {
    try {
        return await Group.find({ site: siteId }).populate({ path: "onCallContacts", model: Contact }).populate({ path: "contacts", model: Contact });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createGroup,
    getGroupsBySiteId
}