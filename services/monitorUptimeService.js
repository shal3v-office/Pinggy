const { MonitorUptime } = require("../models/monitorUptimeModel");

//add new monitor row
const addMonitorRow = async(monitor) => {
    try {
        const monitorCreate = await MonitorUptime.create(monitor);
        return monitorCreate;
    } catch (error) {
        console.log(error);
    }
};

//get monitor rows by site
const getMonitorRowsBySite = async(siteId) => {
    try {
        return await MonitorUptime.find({ site: siteId })
    } catch (error) {
        console.log(error);
    }
};

//get faild statuses monitor rows by site
const getFaildMonitorRowsBySite = async(siteId) => {
    try {
        return await MonitorUptime.find({ site: siteId, status: { $ne: 200 } })
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    addMonitorRow,
    getMonitorRowsBySite,
    getFaildMonitorRowsBySite
}