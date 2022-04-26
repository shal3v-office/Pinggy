
const axios = require('axios');
const getPageSpeedInsightPerURL = function(urlToCalc){
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

module.exports = getPageSpeedInsightPerURL;