const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// get all users
router.get('/', authMiddleware.verifyTokenAndAdminAuth, userController.getAllUsers);

//delete users
router.delete('/delete/:id',authMiddleware.verifyTokenAndAdminAuth, userController.deleteUser);

//get user infor
router.get('/detail/:id', userController.getInfor);

//get own infor
router.get('/profile', userController.getInfor);

//edit profile
router.post('/edit-profile', userController.editProfile)

module.exports = router;