const { Site } = require("../models/siteModel");
const customerService = require("./customerService");

//add new site 
const createSite = async(newSite) => {
    try {
        const siteCreated = await Site.create(newSite);
        // newSite.customer.siteList.push(siteCreated._id);
        await customerService.updateCustomerSiteList(newSite.customer,siteCreated._id);
        return siteCreated;
    } catch (error) {
        console.log(error);
    }
};

//get site by customer
const getSitesByCustomerId = async(customerId) => {
    try {
        return await Site.find({ customer: customerId })
    } catch (error) {
        console.log(error);
    }
};

//update inner site links
const updateSiteInnerLinks = async(siteId, innerLinks) => {
    try {
        return await Site.findOneAndUpdate({ 'siteId':siteId }, { $push: { "innerLinks": innerLinks }})
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createSite,
    getSitesByCustomerId,
    updateSiteInnerLinks
}