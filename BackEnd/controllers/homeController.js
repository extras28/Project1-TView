const {
    response
} = require("express");
const Image = require('../models/Image');
const User = require('../models/User')

const homeController = {
    getAllImage: async (req, res) => {
        try {
            const images = await Image.find();
            return res.send({
                result: 'success',
                images: images,
            });
        } catch (error) {
            return res.send({
                result: 'failed',
                message: error,
            })
        }
    },

    // lay chi tiet mot anh
    getImageDetail: async (req, res) => {
        try {
            const {imgId} = req.params

            if (imgId) {
                const image = await Image.findById(imgId);
                const account = await User.findById(image.userId);
                return res.send({
                    result: 'success',
                    image: {
                        ...image._doc,
                        username: account.username,
                        avatar: account.avatar,
                    }
                });
            } else{
                return res.send({
                    result: 'failed',
                    message: 'Ảnh đã bị xóa hoặc không tồn tại',
                })
            }


        } catch (error) {
            return res.send({
                result: 'failed',
                message: error,
            })
        }
    }
}

module.exports = homeController;