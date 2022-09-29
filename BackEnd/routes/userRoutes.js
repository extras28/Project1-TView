const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// get all users
router.get('/api/v1/user/', authMiddleware.verifyTokenAndAdminAuth, userController.getAllUsers);

//delete users
router.delete('/api/v1/user/delete/:id',authMiddleware.verifyTokenAndAdminAuth, userController.deleteUser);

//get user infor
router.get('/api/v1/user/detail/:id', userController.getInfor);

//get own infor
router.get('/api/v1/user/profile', userController.getInfor);

//edit profile
router.post('/api/v1/user/edit-profile', userController.editProfile);

//upload image
router.post('/api/v1/user/upload-image', userController.uploadImage);

//get own images
router.get('/api/v1/user/get-my-images',userController.getMyImage);

//delete one or more image
router.delete('/api/v1/image/delete/:imgId',userController.deleteImage);

//edit image detail
router.put('/api/v1/image/edit/:imgId',userController.editImage);

module.exports = router;