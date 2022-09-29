const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

//get all users
router.get('/api/v1/admin/get-all-user/:isAdmin', adminController.getAllUser);

//delete user
router.delete('/api/v1/admin/delete-user/:userId', adminController.deleteUser);

//edit user
router.put('/api/v1/admin/edit-user/:userId', adminController.editUser);

//delete image
router.delete('/api/v1/admin/delete-image/:imgId', adminController.deleteImage);

//edit image detail
router.put('/api/v1/admin/edit-image/:imgId', adminController.editImage);

//get account profile
router.get('/api/v1/admin/get-account-profile/:userId', adminController.getAccountProfile);
module.exports = router;
