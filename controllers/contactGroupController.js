const contactGroupService = require("../services/contactGroupServies");

const createGroup = async(req, res) => {
    try {
        const group = req.body;
        const createdGroup = await contactGroupService.createGroup(group);
        return res.status(200).json(createdGroup);
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
};

const getGroupsBySiteId = async(req, res) => {
    try {
        const siteId = req.params.siteId;
        console.log(siteId)
        const group = await contactGroupService.getGroupsBySiteId(siteId);
        return res.status(200).json(group);
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    createGroup,
    getGroupsBySiteId
}