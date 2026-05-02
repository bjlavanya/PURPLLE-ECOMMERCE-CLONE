const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const OrderShippedMail = async (email) => {
    try {
        const msg = {
            to: `${email}`,
            from: process.env.EMAIL_USER,
            subject: 'Your Order is Being Shipped',
            html: `
            <h3>Dear Customer</h3>
            <p>Thank you for your order! We are shipped your order and will notify you once it’s delivered.</p>
            <h3>Thank You, Team Purplle</h3>
            `
        };

        await sgMail.send(msg);

        console.log("Order Shipped Mail sent successfully");

    } catch (error) {
        console.error("Send Mail error:", error);
        throw error;
    }
};

module.exports = OrderShippedMail;