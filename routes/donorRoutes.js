const express = require('express');
const router = express.Router();
const upload = require('../config'); // Multer configuration
const donorController = require('../controllers/donorController');

// POST route for donor signup
router.post('/signup', upload.single('photoId'), donorController.createDonor);

module.exports = router;
