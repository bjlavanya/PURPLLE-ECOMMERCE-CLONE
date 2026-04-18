const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const OrderDeliveredMail = async (email) => {
    try {
        const msg = {
            to: `${email}`,
            from: process.env.EMAIL_USER,
            subject: 'Your Order is Being Delivered',
            html: `
            <h3>Dear Customer</h3>
            <p>Good news! Your order has been delivered successfully. We hope you enjoy your purchase. Thank you for shopping with us!</p>
            <h3>Thank You, Team Purplle</h3>
            `
        };

        await sgMail.send(msg);

        console.log("Order Delievered Mail sent successfully");

    } catch (error) {
        console.error("Send Mail error:", error);
        throw error;
    }
};

module.exports = OrderDeliveredMail;