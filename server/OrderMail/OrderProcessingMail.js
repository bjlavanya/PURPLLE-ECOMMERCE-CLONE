const nodemailer = require('nodemailer');

const OrderProcessingMail = async(email) => {
    try {
        //make transporter to send mail
        const transporter = nodemailer.createTransport( {
            service: "gmail",
            auth: {
                user: "lavibg2004@gmail.com",
                pass: 'xvsvpeexwfclpovl'
            }
        });

        //send mail
        await transporter.sendMail( {
            from: 'PURPLLE - OTP VERIFICATION',
            to: `${email}`,
            subject: 'Your Order is Being Processed',
            html: `
            <h3>Dear Customer</h3>
            <p>Thank you for your order! We are currently processing it and will notify you once it’s on its way.</p>
            <h3>Thank You, Team Purplle</h3>
            `
        });
    }
    catch(error) {
        console.log("Send Mail error: ", error)
    }
}

module.exports = OrderProcessingMail; 