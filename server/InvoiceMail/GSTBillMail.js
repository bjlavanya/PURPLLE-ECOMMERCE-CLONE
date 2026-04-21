const sgMail = require('@sendgrid/mail');

const {gstInvoicePdf} = require('../service/gstInvoicePdf')
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const GSTBillMail = async (email, orders, user) => {

    try {
        const pdfBuffer = await gstInvoicePdf(orders, user)
        const msg = {
            to: `${email}`,
            from: process.env.EMAIL_USER,
            subject: 'Your Order Confirmed',
            html: `
            <h3>Dear Customer</h3>
            <p>Good news! Your order has been delivered confirmed successfully. Your order details has been attached in this mail.  View attachment. Thank you for shopping with us!</p>
            <h3>Thank You, Team Purplle</h3>
            `,
            text: 'Your Order confirmed',
            attachments: [
                {
                    content: pdfBuffer.toString("base64"),
                    filename: "gstInvoice.pdf",
                    type: "application/pdf",
                    disposition: "attachment"
                }
            ]
        };

        await sgMail.send(msg);

        console.log("Order Confirmed Mail sent successfully");

    } catch (error) {
        console.error("Send Mail error:", error);
        throw error;
    }
};

module.exports = GSTBillMail;