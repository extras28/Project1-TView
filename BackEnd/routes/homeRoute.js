const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// lay tat ca anh
router.get('/api/v1/get-all-image', homeController.getAllImage);

//lay chi tiet mot anh
router.get('/api/v1/get-image-detail/:imgId', homeController.getImageDetail)

module.exports = router;