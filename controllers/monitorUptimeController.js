const monitorService = require("../services/monitorUptimeService");
const scheduleMonitorUptime = require('../lib/functions/cronJobs/scheduleMonitorUptime');
const runUptimeMonitor = require('../lib/functions/runUptimeMonitor.js');


const runMonitor = async(req, res) => {
    try {
        console.log("runMonitor");
        const monitorRows = await runUptimeMonitor().then( function(response) {
            scheduleMonitorUptime.scheduleMonitorUptime();
        });

        return res.status(200).json(monitorRows);
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
};

const getFaildMonitorRowsBySite = async(req, res) => {
    try {
        const siteId = req.params.siteId;
        const failMonitors = await monitorService.getFaildMonitorRowsBySite(siteId);
        return res.status(200).json(failMonitors);
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
};

const getMonitorRowsBySite = async(req, res) => {
    try {

        let siteId = req.body.siteId;
        const siteMonitors = await monitorService.getMonitorRowsBySite(siteId);
        return res.status(200).json(siteMonitors);
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    runMonitor,
    getFaildMonitorRowsBySite,
    getMonitorRowsBySite
};