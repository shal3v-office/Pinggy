const monitorService = require("../services/monitor-service");
const customerService = require("../services/customer-service");
const axios = require('axios');

const addMonitorRow = async(url, status, siteId) => {
    monitor =  {
        url: url,
        status:status,
        site: siteId
    };
    const createdMonitor = await monitorService.addMonitorRow(monitor);
    console.log(createdMonitor);
};

const runMonitor = async(req, res) => {
    try {
        const monitorRows = [];
        const customers = await customerService.getAllCustomers();
        for(const customer of customers){
            for(const site of customer.sites){
                var url = site.mainURL;
                if(url.charAt(url.length - 1)!="/")url += "/";
                for(const link of site.innerLinks){
                    var monitorUrl = url + link;
                    console.log(monitorUrl);
                    axios.get(monitorUrl)
                    .then(function (response) {
                        monitorRows.push(addMonitorRow(response.config.url, response.status, site._id));
                        console.log(response);
                    })
                    .catch(function (error) {
                        monitorRows.push(addMonitorRow(error.config.url, error.response.status, site._id));
                        console.log(error);
                    })
                }
            }
        }
        return res.status(200).json(monitorRows);
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
};
// setInterval( runMonitor, 30 * 1000);

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