const monitorService = require("../../services/monitorUptimeService");
const customerService = require("../../services/customerService");
const axios = require('axios');

const addMonitorRow = async(url, status, siteId, firstOfSite) => {
    monitor =  {
        url: url,
        status:status,
        site: siteId,
        firstOfSite: firstOfSite
    };
    const createdMonitor = await monitorService.addMonitorRow(monitor);
};

const runMonitor = async() => {
    try {
        const monitorRows = [];
        const customers = await customerService.getAllCustomers();
        for(const customer of customers){
            for(const site of customer.sites){
                var url = site.mainURL;
                console.log(url);
                axios.get(url)
                .then(function (response) {
                    monitorRows.push(addMonitorRow(response.config.url, response.status, site._id, true));
                })
                .catch(function (error) {
                    monitorRows.push(addMonitorRow(error.config.url, error.response.status, site._id, true));
                    console.log(error.message);
                });
                for(const link of site.innerLinks){
                    var monitorUrl = url + link;
                    console.log(monitorUrl);
                    axios.get(monitorUrl)
                    .then(function (response) {
                        monitorRows.push(addMonitorRow(response.config.url, response.status, site._id, false));
                    })
                    .catch(function (error) {
                        monitorRows.push(addMonitorRow(error.config.url, error.response.status, site._id, false));
                        console.log(error.message);
                    })
                }
            }
        }
        return monitorRows;
    } catch (err) {
        console.log(err);
    }
};

module.exports = runMonitor;