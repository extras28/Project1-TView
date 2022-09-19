const User = require('../models/User');
const moment = require("moment");

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
                dob
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
    }

}

module.exports = userController;
