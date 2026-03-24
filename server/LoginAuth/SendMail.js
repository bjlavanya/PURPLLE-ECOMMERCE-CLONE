const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (email, otp) => {
  try {
    const msg = {
      to: `${email}`,
      from: process.env.EMAIL_USER, // verified sender
      subject: 'OTP Verification Code for Purplle Login/Signup',
      html: `
        <h3>Dear Customer</h3>
        <p>Your OTP is <b>${otp}</b>. This is valid for 15 minutes.</p>
        <h3>Thank You, Team Purplle</h3>
      `
    };

    await sgMail.send(msg);

    console.log("Mail sent successfully");

  } catch (error) {
    console.error("Send Mail error:", error);
    throw error;
  }
};

module.exports = sendMail;