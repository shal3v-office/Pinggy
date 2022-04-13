const { MonitorSpeed } = require("../models/monitorSpeedModel");

//add new monitor row
const addMonitorRow = async(monitor) => {
    try {
        const monitorCreate = await MonitorSpeed.create(monitor);
        return monitorCreate;
    } catch (error) {
        console.log(error);
    }
};

//get monitor rows by site
const getMonitorRowsBySite = async(siteId) => {
    try {
        return await MonitorSpeed.find({ site: siteId })
    } catch (error) {
        console.log(error);
    }
};

//get lasr monitor row by site
const getLastMonitorRow = async(siteId) => {
    try {
        return await MonitorSpeed.findOne({$query: { site: siteId }, $orderby: {$natural : -1}});
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    addMonitorRow,
    getMonitorRowsBySite,
    getLastMonitorRow
}