
const CronJob = require('cron').CronJob;
const runUptimeMonitor = require('../runUptimeMonitor');

var job;
const scheduleMonitorUptime = async() => {
    job = new CronJob('30 * * * * *', async function() {
        await runUptimeMonitor().then( function(response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log("error in runUptimeMonitor function from scheduleMonitorUptime function");
            console.log(error.message);
        });
    });
    job.start();
}

const stopCron = async() => {
    console.log("============= Destroy node-cron Jobs ================")
      if(job !== undefined && job !== null) job.stop();
}

module.exports ={
    scheduleMonitorUptime,
    stopCron
};