const siteService = require("../services/site-service");
const createSite = async(req, res) => {
    try {
        const site = req.body;
        const createdSite = await siteService.createSite(site);
        return res.status(200).json(createdSite);
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
};

const getSitesByCustomerId = async(req, res) => {
    try {
        const customerId = req.params.customerId;
        console.log(customerId);
        const sites = await siteService.getSitesByCustomerId(customerId);
        return res.status(200).json(sites);
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
};

const updateSiteInnerLinks = async(req, res) => {
    try {

        let siteId = req.body.siteId;
        let innerLinks = req.body.innerLinks;
        const site = await siteService.updateSiteInnerLinks(siteId, innerLinks);
        return res.status(200).json(site);
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    createSite,
    getSitesByCustomerId,
    updateSiteInnerLinks
};