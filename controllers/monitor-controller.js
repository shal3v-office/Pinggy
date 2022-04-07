const monitorService = require("../services/monitor-service");
const customerService = require("../services/customer-service");

const runMonitor = async(req, res) => {
    try {
        const customers = await customerService.getAllCustomers();
        customers.forEach(costomer => {
            costomer.sites.forEach(site=>{
                site.innerLinks.forEach(link=>{
                    var url = site.mainURL;
                    if(url.charAt(url.length - 1)!="/")url += "/";
                    url += link;
                    console.log(url);
                    fetch(url).then((res) => {
                        console.log("then");
                      })
                      .catch((err) => {
                        console.error("catch");
                    }).finally( ()=>{console.log("finally")});
                })
            });
        });
        // const monitor = req.body;
        // const createdMonitor = await monitorService.addMonitorRow(monitor);
        return res.status(200).json(customers);
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