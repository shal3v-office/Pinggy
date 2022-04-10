const monitorService = require("../services/monitor-service");
const customerService = require("../services/customer-service");

const addMonitorRow = async(url, status, siteId) => {
    console.log("finally");
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
        // customers.forEach(costomer => {
            for(const site of customer.sites){
            // customer.sites.forEach(site=>{
                for(const link of site.innerLinks){
                // site.innerLinks.forEach(link=>{
                    var url = site.mainURL;
                    if(url.charAt(url.length - 1)!="/")url += "/";
                    url += link;
                    console.log(url);
                    fetch("https://pinggy-app.herokuapp.com/"+url).then((res) => {
                        console.log("then");
                        console.log(res);
                        monitorRows.push(addMonitorRow(url, 200, site._id));
                    })
                    .catch((err) => {
                        console.error("catch");
                        console.log(err);
                        monitorRows.push(addMonitorRow(url, 500, site._id));
                    });
                }
            }
        }
        // const monitor = req.body;
        // const createdMonitor = await monitorService.addMonitorRow(monitor);
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