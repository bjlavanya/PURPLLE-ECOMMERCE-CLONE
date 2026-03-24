const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const OrderProcessingMail = async (email) => {
    try {
        const msg = {
            to: `${email}`,
            from: process.env.EMAIL_USER,
            subject: 'Your Order is Being Processed',
            html: `
            <h3>Dear Customer</h3>
            <p>Thank you for your order! We are currently processing it and will notify you once it’s on its way.</p>
            <h3>Thank You, Team Purplle</h3>
            `
        };

        await sgMail.send(msg);

        console.log("Order Processed Mail sent successfully");

    } catch (error) {
        console.error("Send Mail error:", error);
        throw error;
    }
};

module.exports = OrderProcessingMail;