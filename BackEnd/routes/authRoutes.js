const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');


//REGISTER
router.post('/api/v1/auth/register', authController.registerUser);

//LOGIN
router.post('/api/v1/auth/login', authController.loginUser);

//refresh
router.post('/api/v1/auth/refresh', authController.requestRefreshToken);

//log out
router.post('/api/v1/auth/logout',  authController.logoutUser);

//change password
router.put('/api/v1/auth/change-password', authController.changePassword);

//forgot password
router.post('/api/v1/auth/request-reset-password', authController.requestResetPassword)

//reset password
router.post('/api/v1/auth/reset-password', authController.resetPassword);

module.exports = router;
