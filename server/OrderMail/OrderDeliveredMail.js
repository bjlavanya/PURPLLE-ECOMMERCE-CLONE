const nodemailer = require('nodemailer');

const OrderDeliveredMail = async(email) => {
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
            subject: 'Your Order is Being Delivered',
            html: `
            <h3>Dear Customer</h3>
            <p>Good news! Your order has been delivered successfully. We hope you enjoy your purchase. Thank you for shopping with us!</p>
            <h3>Thank You, Team Purplle</h3>
            `
        });
    }
    catch(error) {
        console.log("Send Mail error: ", error)
    }
}

module.exports = OrderDeliveredMail; 