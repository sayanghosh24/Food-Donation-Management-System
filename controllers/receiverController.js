const bcrypt = require('bcryptjs');
const Receiver = require('../models/Receiver');

// Create a new donor
exports.createReceiver = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if email already exists
    const existingReceiver = await Receiver.findOne({ email });
    if (existingReceiver) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new Receiver
    const newReceiver = new Receiver({
      fullName,
      email,
      password: hashedPassword,
      photoId: req.file.path // Store the file path of the uploaded Photo ID
    });

    // Save Receiver to database
    await newReceiver.save();
    res.status(201).json({ message: 'Receiver created successfully' });
  } catch (error) {
    console.error('Error creating Receiver:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
