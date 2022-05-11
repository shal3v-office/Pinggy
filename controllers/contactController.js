const contactService = require("../services/contactService");

const createContact = async(req, res) => {
    try {
        const contact = req.body;
        const createdContact = await contactService.createContact(contact);
        return res.status(200).json(createdContact);
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
};
const getContactByUserId = async(req, res) => {
    try {
        const userId = req.params.userId;
        const contact = await contactService.getContactByUserId(userId);
        return res.status(200).json(contact);
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
};
const getContactsBySiteId = async(req, res) => {
    try {
        const siteId = req.params.siteId;
        console.log(siteId)
        const contact = await contactService.getContactsBySiteId(siteId);
        return res.status(200).json(contact);
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    createContact,
    getContactByUserId,
    getContactsBySiteId
};