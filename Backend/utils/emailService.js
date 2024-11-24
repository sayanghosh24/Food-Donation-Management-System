const nodemailer = require('nodemailer');

// Configure the transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Use environment variables for security
        pass: process.env.EMAIL_PASS,
    },
});

// Function to send a verification email
const sendVerificationEmail = async (userEmail) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: "Verification Successful",
            text: "Your photo ID has been verified successfully. You can now log in to your account.",
        });
        console.log("Verification email sent!");
    } catch (error) {
        console.error("Failed to send email:", error.message);
    }
};

module.exports = sendVerificationEmail;
