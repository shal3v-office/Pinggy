
const CronJob = require('cron').CronJob;
const monitorSpeedService = require("../../services/monitorSpeedService");
const getPageSpeedInsightPerURL = require('../../lib/functions/getPageSpeedInsightPerURL');

const scheduleSpeedMonitor = function(siteId,urlToSchedule){

    var job = new CronJob('0 0 */1 * * *', async function() {
        await getPageSpeedInsightPerURL(urlToSchedule)
            .then( async function (response) {
                checkedDate = new Date();
                let monitorRow = await monitorSpeedService.addMonitorRow({ siteId: siteId,link: urlToSchedule,timestamps:{ createdAt: checkedDate },gpsiResult: response.result  });
                //console.log("hi from cron job i add this!!!!!");
            })
            .catch(function (error) {
                console.log("error in getPageSpeedInsightPerURL function from scheduleSpeedMonitor function");
                console.log(error.message);
            })
    });
    job.start();
}

module.exports = scheduleSpeedMonitor;