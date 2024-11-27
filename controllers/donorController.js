const bcrypt = require('bcryptjs');
const Donor = require('../models/Donor');

// Create a new donor
exports.createDonor = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if email already exists
    const existingDonor = await Donor.findOne({ email });
    if (existingDonor) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new donor
    const newDonor = new Donor({
      fullName,
      email,
      password: hashedPassword,
      photoId: req.file.path // Store the file path of the uploaded Photo ID
    });

    // Save donor to database
    await newDonor.save();
    res.status(201).json({ message: 'Donor created successfully' });
  } catch (error) {
    console.error('Error creating donor:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
