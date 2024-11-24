const sendVerificationEmail = require('../utils/emailService');

// Admin verification logic
const verifyUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Update the user verification status in the database
        const user = await User.findByIdAndUpdate(userId, { isVerified: true }, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send verification email
        await sendVerificationEmail(user.email);

        res.status(200).json({ message: 'User verified and email sent!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
};
