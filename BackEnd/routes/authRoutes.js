const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');


//REGISTER
router.post('/register', authController.registerUser);

//LOGIN
router.post('/login', authController.loginUser);

//refresh
router.post('/refresh', authController.requestRefreshToken);

//log out
router.post('/logout', authMiddleware.verifyToken, authController.logoutUser);


module.exports = router;
