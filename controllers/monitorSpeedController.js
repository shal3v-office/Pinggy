const monitorSpeedService = require("../services/monitorSpeedService");
const getPageSpeedInsight = require('../lib/functions/getPageSpeedInsightPerURL.js');
const scheduleSpeedMonitor = require('../lib/functions/cronJobs/scheduleSpeedMonitor');


const runMonitorPerSite = async(req, res) => {
    try {
        let siteId = req.params.siteId;
        const monitorRows = await getPageSpeedInsight(siteId).then( function(response) {
            scheduleSpeedMonitor.scheduleSpeedMonitor();
            console.log(response)
        });
        return res.status(200).json(monitorRows);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

const getMonitorRowsBySite = async(req, res) => {
    try {
        let siteId = req.params.siteId;
        const siteMonitors = await monitorSpeedService.getMonitorRowsBySite(siteId);
        return res.status(200).json(siteMonitors);
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
};

const getLastMonitorRow = async(req, res) => {
    try {
        let siteId = req.params.siteId;
        const siteMonitor = await monitorSpeedService.getLastMonitorRow(siteId);
        return res.status(200).json(siteMonitor);
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    getMonitorRowsBySite,
    getLastMonitorRow,
    runMonitorPerSite
};