//Create Or Upadte ExamAfterUpdate
let data = {
    examIdFromWP:"67",
    userIdFromWP:"1",
    score:"0",
    date:new Date() ,
    lastDuration:"0",
    solvingStatus:"NOT AT ALL"
};
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (this.readyState != 4) return;

    if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        console.log(data);
        // we get the returned data
    }
    // end of state change: it can be after some time (async)
};

xhr.open("POST", "http://localhost:3000/examAfterUpdate/createOrUpdate", true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify(data));

//Create Or Upadte QuestionAfterUpdate
let data = [
    {
        questionIdFromWP:"65",
        examAfterUpdateId:"6177a4154f989835061825d6",
        selectedOptionOrderFromWP:"2",
        status:"KNOW" ,
        isCorrect:"true"
    },
    {
        questionIdFromWP:"66",
        examAfterUpdateId:"6177a4154f989835061825d6",
        selectedOptionOrderFromWP:"1",
        status:"HELP" ,
        isCorrect:"false"
    
}];
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (this.readyState != 4) return;

    if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        console.log(data);
        // we get the returned data
    }
else{
    console.log(this);
}

    // end of state change: it can be after some time (async)
};

xhr.open("POST", "http://localhost:3000/questionAfterUpdate/createOrUpdate", true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify(data));