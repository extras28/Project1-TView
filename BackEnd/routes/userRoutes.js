const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// get all users
router.get('/', authMiddleware.verifyTokenAndAdminAuth, userController.getAllUsers);

//delete users
router.delete('/delete/:id',authMiddleware.verifyTokenAndAdminAuth, userController.deleteUser);

module.exports = router;