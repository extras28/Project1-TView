const User = require('../models/User');
const Image = require('../models/Image');
const moment = require("moment");
const {
    cloudinary
} = require('../utils/cloudinary');

const userController = {
    // get all users
    getAllUsers: async function (req, res) {
        try {
            const users = await User.find();
            res.status(200).send(users);
        } catch (err) {
            res.status(404).send(err);
        }
    },

    //delete one or more users
    deleteUser: async function (req, res) {
        try {
            await User.findByIdAndDelete(req.params.id);
        } catch (err) {
            res.status(500).send(err);
        }
    },

    //get user infor
    getInfor: async function (req, res) {
        try {
            const accessToken = req.headers.authorization.split(' ')[1];
            if (accessToken || moment(account.expirationDateToken).diff(moment.now()) >
                0) {
                const account = await User.findOne({
                    accessToken: accessToken
                });
                return res.send({
                    result: 'success',
                    account: {
                        id: account.id,
                        email: account.email,
                        username: account.username,
                        gender: account.gender,
                        dob: account.dob,
                        avatar: account.avatar,
                        phone: account.phone,
                        address: account.address,
                    }
                })
            } else {
                return res.send({
                    result: 'failed',
                    message: 'Bạn chưa đăng nhập'
                })
            }
        } catch (error) {
            return res.send({
                result: 'failed',
                message: error,
            })
        }
    },

    editProfile: async (req, res) => {
        try {
            const {
                username,
                phone,
                address,
                gender,
                dob,
                avatar
            } = req.body;
            const accessToken = req.headers.authorization.split(' ')[1];

            const account = await User.findOne({
                accessToken: accessToken
            });

            if (!accessToken || moment(account.expirationDateToken).diff(moment.now()) <
                0) {
                return res.send({
                    result: 'failed',
                    message: 'Bạn chưa đăng nhập',
                })
            }

            if (avatar) {
                const uploadAvatar = await cloudinary.uploader.upload(avatar);

                await User.updateOne({
                    accessToken: accessToken
                }, {
                    username: username,
                    phone: phone,
                    address: address,
                    gender: gender,
                    dob: dob,
                    avatar: uploadAvatar.secure_url,
                });

                const responseAccount = await User.findOne({
                    email: account.email
                });

                return res.send({
                    result: "success",
                    account: responseAccount,
                })
            }

            await User.updateOne({
                accessToken: accessToken
            }, {
                username: username,
                phone: phone,
                address: address,
                gender: gender,
                dob: dob,
            });

            const responseAccount = await User.findOne({
                email: account.email
            });

            return res.send({
                result: "success",
                account: responseAccount,
            })


        } catch (error) {
            return res.send({
                result: 'failed',
                message: error,
            })
        }
    },

    uploadImage: async (req, res) => {
        try {
            const {
                title,
                description,
                src
            } = req.body;

            const accessToken = req.headers.authorization.split(' ')[1];

            const account = await User.findOne({
                accessToken: accessToken,
            });

            // store in cloudinary
            const fileStr = src;
            const uploadResponse = await cloudinary.uploader.upload(fileStr, {
                upload_preset: 'TView_Image_Storage'
            })

            // store image url into image storage
            const image = new Image({
                title: title,
                userId: account._id,
                description: description,
                src: uploadResponse.secure_url
            });

            await image.save();
            res.send({
                result: 'success',
                image: image
            })

        } catch (error) {
            return res.send({
                result: 'failed',
                message: error
            })
        }
    },

    getMyImage: async (req, res) => {
        try {
            const accessToken = req.headers.authorization.split(' ')[1];
            const account = await User.findOne({
                accessToken: accessToken,
            })
            const myImages = await Image.find({
                userId: account._id,
            });


            return res.send({
                result: 'success',
                myImages: myImages,
            })
        } catch (error) {
            res.send({
                result: 'failed',
                message: error,
            })
        }
    },

    deleteImage: async (req, res) => {
        try {
            const {
                imgId
            } = req.params;
            if (imgId) {
                await Image.findByIdAndDelete(imgId);
                res.send({
                    result: 'success',
                    message: 'Xóa ảnh thành công'
                })
            } else {
                res.send({
                    result: 'failed',
                    message: 'Ảnh không tồn tại hoặc đã bị xóa'
                })
            }

        } catch (error) {
            res.send({
                result: 'failed',
                message: error
            })
        }
    },

    editImage: async (req, res) => {
        try {
            const {
                title,
                description
            } = req.body;
            const {
                imgId
            } = req.params;
            if (imgId) {
                await Image.findByIdAndUpdate(imgId,{
                    title: title,
                    description: description,
                });
                const ressponseImage = await Image.findById(imgId);
                res.send({
                    result: 'success',
                    image: ressponseImage,
                })
            } else {
                res.send({
                    result: 'failed',
                    message: 'Ảnh không tồn tại hoặc đã bị xóa'
                })
            }
        } catch (error) {
            res.send({
                result: 'failed',
                message: error
            })
        }
    }

}

module.exports = userController;
