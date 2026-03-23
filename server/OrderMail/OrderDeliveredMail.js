const nodemailer = require('nodemailer');

const OrderDeliveredMail = async(email) => {
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
            from: 'PURPLLE',
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