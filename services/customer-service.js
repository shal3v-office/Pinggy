const { Customer } = require("../models/customerModel");
const { Site } = require("../models/siteModel");

//add new customer 
const createCustomer = async(newCustomer) => {
    try {
        const customerCreated = await Customer.create(newCustomer);
        return customerCreated;
    } catch (error) {
        console.log(error);
    }
};

//get customer by user id
const getCustomerByUserId = async(userId) => {
    try {
        return await Customer.find({ user: userId })
    } catch (error) {
        console.log(error);
    }
};

//get All customers
const getAllCustomers = async() => {
    try {
        return await Customer.find({}).populate({ path: "sites", model: Site });
    } catch (error) {
        console.log(error);
    }
};

//update customer Site List
const updateCustomerSiteList = async(customerId,siteList) => {
    try {
        return await Customer.findOneAndUpdate({ 'customerId':customerId }, { $push: { "sites": siteList } })
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createCustomer,
    getCustomerByUserId,
    updateCustomerSiteList,
    getAllCustomers
}