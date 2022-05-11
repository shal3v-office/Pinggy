const mongoose = require("mongoose");

const Notification = mongoose.model(
    "Notification",
    new mongoose.Schema({
        name: { type:String },
        subject: { type: String },
        title:{ type:String },
        content: { type: String },
    })
);
module.exports = {Notification};