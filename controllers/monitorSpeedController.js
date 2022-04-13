const monitorSpeedService = require("../services/monitorSpeedService");
const customerService = require("../services/customerService");
const siteService = require("../services/siteService");
const getPageSpeedInsightPerURL = require('../lib/functions/getPageSpeedInsightPerURL.js');


const runMonitorPerSite = async(req, res) => {
    try {
        let monitorRows = [];
        let siteId = req.params.siteId;
        const site = await siteService.getSiteById(siteId);
        if(!site) throw new Error("The site is not valid");
        var url = site.mainURL;
        var checkedDate = new Date();
        if(url.charAt(url.length - 1)!="/")url += "/";
            for(const link of site.innerLinks){
                var monitorUrl = url + link;
                await getPageSpeedInsightPerURL(monitorUrl)
                .then( async function (response) {
                    let monitorRow = await monitorSpeedService.addMonitorRow({ siteId: siteId,link: monitorUrl,timestamps:{ createdAt: checkedDate },gpsiResults: response.result  });
                    monitorRows.push(monitorRow);
                })
                .catch(function (error) {
                    console.log("error in getPageSpeedInsightPerURL function");
                    console.log(error.message);
                })
            }
        return res.status(200).json(monitorRows);
    } catch (err) {
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