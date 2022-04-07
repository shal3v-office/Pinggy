const router = require("express").Router();
const customerController = require("../controllers/customer-controller");

router.post("/createCustomer", customerController.createCustomer);
router.get("/getCustomerByUser/:userId", customerController.getCustomerByUser);
router.get("/getAllCustomers", customerController.getAllCustomers);

module.exports = router;