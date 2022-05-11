const nodemailer = require('nodemailer');
const config = require("../../../config.js");

const sendEmail = async(to, subject, text)=>{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.EMAIL_USER_NAME,
      pass: config.EMAIL_PASSWORD
    }
  });
    
  var mailOptions = {
    from: config.EMAIL_USER_NAME,
    to: to,
    subject: subject,
    text: text
  }
  try{
    const info = await transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    return info;
  }
  catch(error){
    console.log(error);
  }
}

module.exports = sendEmail;