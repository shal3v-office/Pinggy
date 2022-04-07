const customerService = require("../services/customer-service");
const createCustomer = async(req, res) => {
    try {
        const customer = req.body;
        const createdCustomer = await customerService.createCustomer(customer);
        return res.status(200).json(createdCustomer);
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
};
const getCustomerByUser = async(req, res) => {
    try {
        const userId = req.params.userId;
        console.log(userId)
        const customer = await customerService.getCustomerByUserId(userId);
        return res.status(200).json(customer);
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
};
const getAllCustomers = async(req, res) => {
    try {
        const customers = await customerService.getAllCustomers();
        return res.status(200).json(customers);
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    createCustomer,
    getCustomerByUser,
    getAllCustomers
};