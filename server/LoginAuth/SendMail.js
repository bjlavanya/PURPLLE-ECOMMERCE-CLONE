const nodemailer = require('nodemailer');

const sendMail = async(email, otp) => {
    try {
        //make transporter to send mail
        const transporter = nodemailer.createTransport( {
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        //send mail
        await transporter.sendMail( {
            from: 'PURPLLE - OTP VERIFICATION',
            to: `${email}`,
            subject: 'OTP Verification Code for Purplle Login/Signup',
            html: `
            <h3>Dear Customer</h3>
            <p>You otp is ${otp}. This is valid only for 15 minutes.</p>
            <h3>Thank You, Team Purplle</h3>
            `
        });
    }
    catch(error) {
        console.log("Send Mail error: ", error)
    }
}

module.exports = sendMail; 