const express = require('express');
const router = express.Router();
const upload = require('../config'); // Multer configuration
const receiverController = require('../controllers/receiverController');

// POST route for Receiver signup
router.post('/signup', upload.single('photoId'), receiverController.createReceiver);

module.exports = router;
