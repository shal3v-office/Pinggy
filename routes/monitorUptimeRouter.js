const router = require("express").Router();
const monitorController = require("../controllers/monitorUptimeController");

router.get("/createCustomer/:siteId", monitorController.getFaildMonitorRowsBySite);
router.get("/getCustomerByUser/:siteId", monitorController.getMonitorRowsBySite);
router.get("/runMonitor", monitorController.runMonitor);

module.exports = router;