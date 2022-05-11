const { Notification } = require("../models/notificationModel");

//add new Notification 
const createNotification = async(newNotification) => {
    try {
        const notificationCreated = await Notification.create(newNotification);
        return notificationCreated;
    } catch (error) {
        console.log(error);
    }
};

//get Notification by Notification id
const getNotificationById = async(notificationId) => {
    try {
        return await Notification.findById({ _id: notificationId })
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    createNotification,
    getNotificationById
}