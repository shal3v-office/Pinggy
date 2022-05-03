const monitorService = require("../../services/monitorUptimeService");
const customerService = require("../../services/customerService");
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

const runMonitor = async() => {
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
        return monitorRows;
    } catch (err) {
        console.log(err);
    }
};

module.exports = runMonitor;