const sendEmail = require('./alerts/sendEmail');
const notificationService = require("../../services/notificationService");
const insidentService = require("../../services/insidentService");

const notificationDic = {
    New_Insident: "627b622c16bf7fe7b6857958",
}



const sendNotification = async (insident) => {
    console.log("notificationDic");
    try {
        const notification = await notificationService.getNotificationById(notificationDic.New_Insident);
        console.log("notification",notification);
        var to = insident.managars.map(a => a.email).join(', ');
        var subject = notification.subject + " " + insident.site.mainURL;
        var text = notification.content;
        console.log("to: " , to);
        console.log("subject: " , subject);
        console.log("text: " , text);
        setTimeout(async() => {
            try{
                email = await sendEmail(to, subject, text);
                insident.status = "NOTIFIED";
                insident.statusDesc = "Email sent to onCall contacts";
                const updatedInsident = await insidentService.createOrUpdateInsident(insident);
                console.log("updatedInsident",updatedInsident);
            }
            catch(error){
                console.log(error);
            }
        }, 30000);
    } catch (error) {
        console.log(error);
    }


};

module.exports = sendNotification;