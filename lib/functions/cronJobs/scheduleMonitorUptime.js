
const CronJob = require('cron').CronJob;
const runUptimeMonitor = require('../runUptimeMonitor');

const scheduleMonitorUptime = async() => {
    var job = new CronJob('30 * * * * *', async function() {
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

module.exports = scheduleMonitorUptime;