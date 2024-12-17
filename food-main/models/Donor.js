const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  photoId: {
    type: String, // This will store the path to the uploaded photo ID
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Donor', donorSchema);
