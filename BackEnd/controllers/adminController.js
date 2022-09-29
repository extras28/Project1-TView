const User = require('../models/User');
const Image = require('../models/Image');
const {
    cloudinary
} = require('../utils/cloudinary');

const adminController = {
    // get all user
    getAllUser: async (req, res) => {
        try {
            const {
                isAdmin
            } = req.params;

            if (isAdmin === "true") {
                const accounts = await User.find({isAdmin: false});
                return res.send({
                    result: 'success',
                    accounts: accounts,
                });
            } else {
                res.send({
                    result: 'failed',
                    message: 'Không đủ quyền thực hiện'
                })
            }
        } catch (error) {
            res.send({
                result: 'failed',
                message: error
            })
        }
    },

    //delete user
    deleteUser: async (req, res) => {
        try {
            const {
                userId,
            } = req.params;
            
            const accessToken = req.headers.authorization.split(' ')[1];
            const user = await User.findOne({
                accessToken: accessToken,
            })

            const isAdmin = user.isAdmin

            const account = await User.findById(userId);

            if (isAdmin === true) {
                if (account) {
                    await User.findByIdAndDelete(userId);
                    await Image.deleteMany({userId: userId})
                    res.send({
                        result: 'success',
                        message: 'Xóa tài khoản thành công'
                    })
                } else {
                    res.send({
                        result: 'failed',
                        message: 'tài khoản không tồn tại hoặc đã bị xóa'
                    })
                }
            } else {
                res.send({
                    result: 'failed',
                    message: 'Không đủ quyền thực hiện'
                })
            }
        } catch (error) {
            res.send({
                result: 'failed',
                message: error
            })
        }
    },

    //edit user
    editUser: async (req, res) => {
        try {
            const {
                userId
            } = req.params;
            const {
                username,
                phone,
                address,
                gender,
                dob,
                avatar,
            } = req.body;

            const user = await User.findById(userId);
            const accessToken = req.headers.authorization.split(' ')[1];
            const account = await User.findOne({
                accessToken: accessToken,
            })

            const isAdmin = account.isAdmin

            if (user) {
                if (isAdmin) {
                    if (avatar) {
                        const uploadAvatr = await cloudinary.uploader.upload(avatar);
                        await User.findByIdAndUpdate(userId, {
                            username: username,
                            phone: phone,
                            address: address,
                            gender: gender,
                            dob: dob,
                            avatar: uploadAvatr.secure_url,
                        });

                        const account = await User.findById(userId);

                        return res.send({
                            result: 'success',
                            account: account,
                        });
                    };

                    if (user) {
                        await User.findByIdAndUpdate(userId, {
                            username: username,
                            phone: phone,
                            address: address,
                            gender: gender,
                            dob: dob,
                        })

                        const account = await User.findById(userId);

                        return res.send({
                            result: 'success',
                            account: account,
                        });
                    } else {
                        res.send({
                            result: 'failed',
                            message: 'Tài khoản không tồn tại'
                        })
                    }
                } else {
                    res.send({
                        result: 'failed',
                        message: 'Không có quyền thực hiện'
                    })
                }
            } else {
                res.send({
                    result: 'failed',
                    message: 'Tài khoản không tồn tại'
                })
            }
        } catch (error) {
            res.send({
                result: 'failed',
                message: error
            })
        }
    },

    //delete image
    deleteImage: async (req, res) => {
        try {
            const {
                imgId
            } = req.params;

            const {
                isAdmin
            } = req.body;

            const image = await Image.findById(imgId);

            if (isAdmin === true) {
                if (image) {
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
            } else {
                res.send({
                    result: 'failed',
                    message: 'Không đủ quyền thực hiện',
                })
            }

        } catch (error) {
            res.send({
                result: 'failed',
                message: error
            })
        }
    },

    //edit image
    editImage: async (req, res) => {
        try {
            const {
                title,
                description,
                isAdmin
            } = req.body;
            const {
                imgId
            } = req.params;

            const image = await Image.findById(imgId);

            if (isAdmin === true) {
                if (image) {
                    await Image.findByIdAndUpdate(imgId, {
                        title: title,
                        description: description,
                    });

                    const responseImage = await Image.findById(imgId);

                    res.send({
                        result: 'success',
                        image: responseImage,
                    })
                } else {
                    res.send({
                        result: 'failed',
                        message: 'Ảnh không tồn tại hoặc đã bị xóa'
                    })
                }
            } else {
                res.send({
                    result: 'failed',
                    message: 'Không đủ quyền thực hiện'
                })
            }
        } catch (error) {
            res.send({
                result: 'failed',
                message: error
            })
        }
    },

    //get accprofile
    getAccountProfile: async (req, res) => {
        try {
            const {
                userId,
            } = req.params;
            
            const accessToken = req.headers.authorization.split(' ')[1];
            const user = await User.findOne({
                accessToken: accessToken,
            })

            const isAdmin = user.isAdmin

            
            if (isAdmin === true) {
                const account = await User.findById(userId);
                if (account) {
                    res.send({
                        result: 'success',
                        account: account,
                    })
                } 
            } else {
                res.send({
                    result: 'failed',
                    message: 'Không đủ quyền thực hiện'
                })
            }
        } catch (error) {
            res.send({
                result: 'failed',
                message: error
            })
        }
    }
};

module.exports = adminController;
