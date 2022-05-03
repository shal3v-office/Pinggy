
const CronJob = require('cron').CronJob;
const monitorSpeedService = require("../../../services/monitorSpeedService");
const getPageSpeedInsight = require('../getPageSpeedInsightPerURL');

const scheduleSpeedMonitor = function(){

    var job = new CronJob('0 0 */1 * * *', async function() {
        await getPageSpeedInsight()
            .then( async function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log("error in getPageSpeedInsightPerURL function from scheduleSpeedMonitor function");
                console.log(error.message);
            })
    });
    job.start();
}

module.exports = scheduleSpeedMonitor;