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
router.post('/logout',  authController.logoutUser);

//change password
router.put('/change-password', authController.changePassword);

//forgot password
router.post('/request-reset-password', authController.requestResetPassword)

//reset password
router.post('/reset-password', authController.resetPassword);

module.exports = router;
