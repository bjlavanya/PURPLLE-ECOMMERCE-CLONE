const nodemailer = require('nodemailer');

const sendMail = async (email, otp) => {
    try {
        //make transporter to send mail
        const transporter = nodemailer.createTransport({
            host: "smtp-relay.gmail.com",
            port: 587,         
            secure: false,  
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        //send mail
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: `${email}`,
            subject: 'OTP Verification Code for Purplle Login/Signup',
            html: `
            <h3>Dear Customer</h3>
            <p>You otp is ${otp}. This is valid only for 15 minutes.</p>
            <h3>Thank You, Team Purplle</h3>
            `
        });
    }
    catch (error) {
        console.error("Send Mail error:", error);
        throw error;
    }
}

module.exports = sendMail; 