const createInsident = require('../lib/functions/createInsident.js');
const sendNotification = require('../lib/functions/sendNotification.js');

const newInsident = async (change) => {
    try {
        const insident = await createInsident(change);
        if (insident) {
            const notification = await sendNotification(insident)
        }
        return insident;
    } catch (err) {
        return "Internal Server Error";
    }
};

module.exports = {
    newInsident,
};