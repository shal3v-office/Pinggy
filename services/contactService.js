const { Contact } = require("../models/contactModel");

//add new contact 
const createContact = async(newContact) => {
    try {
        const contactCreated = await Contact.create(newContact);
        return contactCreated;
    } catch (error) {
        console.log(error);
    }
};

//get contact by user id
const getContactByUserId = async(userId) => {
    try {
        return await Contact.find({ user: userId })
    } catch (error) {
        console.log(error);
    }
};

//get All contacts by site id
const getContactsBySiteId = async(siteId) => {
    try {
        return await Contact.find({ site: siteId });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createContact,
    getContactByUserId,
    getContactsBySiteId
}