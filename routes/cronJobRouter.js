const router = require("express").Router();
const scheduleMonitorUptime = require('../lib/functions/cronJobs/scheduleMonitorUptime');
const scheduleSpeedMonitor = require('../lib/functions/cronJobs/scheduleSpeedMonitor');

router.get("/monitorUptimeStopCron", scheduleMonitorUptime.stopCron);
router.get("/speedMonitorStopCron", scheduleSpeedMonitor.stopCron);

module.exports = router;