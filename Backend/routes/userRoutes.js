const express = require('express');
const { signupUser, verifyUser } = require('../controllers/userController');
const upload = require('../utils/multerMiddleware');

const router = express.Router();

router.post('/signup', upload.single('photo-id'), signupUser);
router.put('/verify/:userId', verifyUser);

module.exports = router;
    
