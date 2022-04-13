//play monitor speed for site
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGJjYWZmZDEwMWI4YjIxYzU0NzIwMyIsImlhdCI6MTY0OTg0NzI0OH0.5aH2Bpj7dFudzo3chdYx2dDfYUi4Dc4tq23gPpJBHA4";
 jQuery.ajax({
    url: 'http://localhost:3000/api/monitorSpeed/runMonitorPerSite/624f160a39e359ca195fd6ea',
    type: 'POST',
    headers: {
      "Authorization": "Bearer " + token
    },
    success: function(result) {
        console.log(result);
    },
    err: function(err) {
        debugger;
    }
});