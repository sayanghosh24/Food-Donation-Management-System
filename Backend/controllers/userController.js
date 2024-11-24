const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Correct case
const sendVerificationEmail = require('../utils/sendEmail');

// Signup User
const signupUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            photoID: req.file.filename,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered! Await verification." });
    } catch (error) {
        res.status(500).json({ message: "Error creating user.", error: error.message });
    }
};

// Admin Verifies User
const verifyUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: "User not found!" });

        user.isVerified = true;
        await user.save();

        await sendVerificationEmail(user.email);

        res.status(200).json({ message: "User verified and email sent!" });
    } catch (error) {
        res.status(500).json({ message: "Verification failed.", error: error.message });
    }
};

module.exports = { signupUser, verifyUser };
