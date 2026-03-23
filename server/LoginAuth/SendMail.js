// const nodemailer = require('nodemailer');

// const sendMail = async (email, otp) => {
//     try {
//         //make transporter to send mail
//         const transporter = nodemailer.createTransport({
//             host: "smtp.sendgrid.net",
//             port: 587,         
//             secure: false,  
//             auth: {
//                 // user: process.env.EMAIL_USER,
//                 // pass: process.env.EMAIL_PASS

//                 user: "apikey",
//                 pass: process.env.SENDGRID_API_KEY
//             }
//         });

//         //send mail
//         await transporter.sendMail({
//             from: process.env.EMAIL_USER,
//             to: `${email}`,
//             subject: 'OTP Verification Code for Purplle Login/Signup',
//             html: `
//             <h3>Dear Customer</h3>
//             <p>You otp is ${otp}. This is valid only for 15 minutes.</p>
//             <h3>Thank You, Team Purplle</h3>
//             `
//         });
//     }
//     catch (error) {
//         console.error("Send Mail error:", error);
//         throw error;
//     }
// }

// module.exports = sendMail; 


const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (email, otp) => {
  try {
    const msg = {
      to: email,
      from: "onboarding@sendgrid.net",
      subject: 'OTP Verification Code',
      html: `
        <h3>Dear Customer</h3>
        <p>Your OTP is <b>${otp}</b>. This is valid for 15 minutes.</p>
        <h3>Thank You, Team Purplle</h3>
      `
    };

    await sgMail.send(msg);

    console.log("✅ Mail sent successfully");

  } catch (error) {
    console.error("Send Mail error:", error);
    throw error;
  }
};

module.exports = sendMail;