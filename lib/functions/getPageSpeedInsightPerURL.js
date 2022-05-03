const siteService = require("../../services/siteService");
const monitorSpeedService = require("../../services/monitorSpeedService");
const axios = require('axios');

const getPageSpeedInsight = async(siteId) => {
    let monitorRows = [];
    const site = await siteService.getSiteById(siteId);
    if(!site) throw new Error("The site is not valid");
    var url = site.mainURL;
    var checkedDate = new Date();
    if(url.charAt(url.length - 1)!="/") url += "/";
    for(const link of site.innerLinks){
        var monitorUrl = url + link;
        await getPageSpeedInsightPerURL(monitorUrl)
        .then( async function (response) {
            //save the result in db
            let monitorRow = await monitorSpeedService.addMonitorRow({ siteId: siteId,link: monitorUrl,timestamps:{ createdAt: checkedDate },gpsiResult: response.result  });
            //schedule this every hour
            // scheduleSpeedMonitor(siteId,monitorUrl);
            //save the object in array
            monitorRows.push(monitorRow);
        })
        .catch(function (error) {
            console.log("error in getPageSpeedInsightPerURL function");
            console.log(error.message);
        })
    }
    return monitorRows;
}

function getPageSpeedInsightPerURL(urlToCalc){
    return new Promise( function(resolve, reject) {
        if(urlToCalc && urlToCalc != ""){
            const url = setUpQuery(urlToCalc);
            axios({
                method: 'get',
                url: url,
            })
            .then(response => {
                resolve ({
                    "status":"success",
                    "message":"",
                    "result": response.data
                })
            })
            .catch(function(error) {
                reject ({
                    "status":"error",
                    "message":"Error in connect to GPSI",
                    "result": error
                })
            });
        } else {
            reject({
                "status":"error",
                "message":"Invalid url"
            })
        }
    });
}

const setUpQuery = function (urlToCalc) {
    const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
    const apiKey = "AIzaSyDLx3fHoLKkuJhgdfbqFdoLsmEcBu3xWvQ";
    const parameters = {
      url: encodeURIComponent(urlToCalc),
    };
    let query = `${api}?`;
    for (key in parameters) {
      query += `${key}=${parameters[key]}`;
    }
    query += `&key=${apiKey}`;
    console.log(query);
    return query;
}

module.exports = getPageSpeedInsight;