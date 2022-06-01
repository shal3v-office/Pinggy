
const CronJob = require('cron').CronJob;
const monitorSpeedService = require("../../../services/monitorSpeedService");
const getPageSpeedInsight = require('../getPageSpeedInsightPerURL');
var job;
const scheduleSpeedMonitor = function(){

    job = new CronJob('0 0 */1 * * *', async function() {
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

const stopCron = async() => {
    console.log("============= Destroy node-cron Jobs ================")
      if(job !== undefined && job !== null) job.stop();
}

module.exports ={
    scheduleSpeedMonitor,
    stopCron
};
