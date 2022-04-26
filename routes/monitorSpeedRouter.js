const router = require("express").Router();
const monitorSpeedController = require("../controllers/monitorSpeedController");

router.get("/getMonitorsRows/:siteId", monitorSpeedController.getMonitorRowsBySite);
router.get("/getLastMonitorRow/:siteId", monitorSpeedController.getLastMonitorRow);
router.post("/runMonitorPerSite/:siteId", monitorSpeedController.runMonitorPerSite);

module.exports = router;