const User = require('../models/User');
const sha256 = require('js-sha256');
const {
    response
} = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const moment = require("moment");
const sequelize = require("sequelize");
const {
    generateRandomStr
} = require('../utils');
const {
    findOne
} = require('../models/User');
const sendEmail = require('../utils/nodemailer');




const authController = {

    refreshTokens: [],

    //REGISTER
    registerUser: async function (req, res) {
        try {
            //check user existent
            let account = await User.findOne({
                email: req.body.email
            });

            if (account) {
                return res.status(200).json({
                    success: false,
                    message: 'account already registered',
                })
            };

            const hashed = await sha256(req.body.password);

            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
                accessToken: '',
                expirationDateToken: null,
                gender: 'UNKNOWN',
                dob: null,
                avatar: '',
                address: '',
                phone: '',
            })

            await user.save();

            return res.status(200).json(user);
        } catch (err) {

            res.status(500).json(err);
        }
    },

    //GENERATE ACCESS TOKEN
    generatingAccessToken: function (user) {
        try {
            return jwt.sign({
                    id: user.id,
                    admin: user.isAdmin
                },
                process.env.JWT_ACCESS_TOKEN, {
                    expiresIn: "2h"
                }

            )
        } catch (err) {
            console.log(err);
        }
    },

    //GENRATE REFRESH TOKEN
    generatingRefreshToken: function (user) {
        try {
            return jwt.sign({
                    id: user.id,
                    admin: user.isAdmin,
                },
                process.env.JWT_REFRESH_TOKEN, {
                    expiresIn: "365d",
                })
        } catch (err) {
            console.log(err);
        }
    },

    //LOGIN
    loginUser: async function (req, res) {
        try {
            const account = await User.findOne({
                email: req.body.email
            });

            if (!account) {
                return res.status(404).json({
                    success: true,
                    message: "Wrong email",
                });
            }

            const hashed = await sha256(req.body.password);
            const validPassword = hashed === account.password;

            if (!validPassword) {
                return res.status(404).json({
                    success: false,
                    message: "Wrong password",
                })
            }



            if (
                !account.accessToken ||
                moment(account.expirationDateToken).diff(moment.now()) <
                0
            ) {

                var accessToken = generateRandomStr(32);
                var expirationDate = new Date();
                var time = expirationDate.getTime();
                var time1 = time + 24 * 3600 * 1000;
                var setTime = expirationDate.setTime(time1);
                var expirationDateStr = moment(setTime)
                    .format("YYYY-MM-DD HH:mm:ss")
                    .toString();

                await account.updateOne({
                    accessToken: accessToken,
                    expirationDateToken: expirationDateStr,
                });
            }
            const responseAccount = await User.findOne({
                _id: account._id
            })


            return res.send({
                result: "success",
                account: responseAccount.toJSON(),
            });


        } catch (err) {
            res.status(500).json({
                success: false,
                error: err,
            });
        }
    },

    requestRefreshToken: (req, res) => {

        // take refresh token from user
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) return res.status(401).json({
            success: false,
            message: 'You are not authenticated !!!',
        })

        if (authController.refreshTokens.includes(refreshToken)) {
            response.status(403).json({
                success: false,
                message: 'Refresh token is not valid',
            })
        }

        jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, user) => {
            if (err) {
                console.log(err);
            } else {
                // remove older refresh token
                authController.refreshTokens = authController.refreshTokens.filter(token => token !== refreshToken)

                //generating new access token and refresh token
                const newAccessToken = authController.generatingAccessToken(user);
                const newRefreshToken = authController.generatingRefreshToken(user);

                authController.refreshTokens.push(newRefreshToken);

                //store refresh token in cookies
                res.cookie('refreshToken', newRefreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    sameSite: 'strict',
                });
                res.status(200).json({
                    success: true,
                    accessToken: newAccessToken,
                })
            }
        })
    },

    logoutUser: async function (req, res) {
        try {
            const accessToken = req.headers.authorization.split(' ')[1];
            const account = await User.findOne({
                accessToken: accessToken
            });
            await account.updateOne({
                accessToken: null,
                expirationDateToken: null,
            });

            const responseAccount = await User.findOne({
                _id: account._id
            })
            res.send({
                responseAccount,
                result: "success",
            });
        } catch (error) {
            res.status(500).send({
                result: "failed",
                reason: error.message,
            });
        }

    },

    changePassword: async function (req, res) {
        try {
            const user = await User.findOne({
                email: req.body.email
            });

            const password = await sha256(req.body.password);
            const newPassword = await sha256(req.body.newPassword);
            if (user) {
                if (password === user.password) {
                    await User.findByIdAndUpdate(user.id, {
                        password: newPassword,
                    })
                    res.status(200).json({
                        success: true,
                        message: "Change password successfully",
                    })
                }
                res.status(400).json({
                    success: false,
                    message: "Password incorrect",
                })
            }
            res.status(400).json({
                success: false,
                message: "Wrong email",
            })
        } catch (err) {
            res.status(400).json({
                success: false,
                error: err,
            })
        }
    },

    requestResetPassword: async function (req, res) {
        try {
            let {
                email
            } = req.body;

            let account = await User.findOne({
                email: email
            });



            if (!account) {
                return res.send({
                    result: 'failed',
                    message: 'email không hợp lệ'
                })
            };
            var random = 100000 + Math.random() * 900000;
            var plainResetPasswordToken = Math.floor(random);

            var expirationDate = new Date();
            var time = expirationDate.getTime();
            var time1 = time + 5 * 60 * 1000;
            var setTime = expirationDate.setTime(time1);
            var expirationDateStr = moment(setTime)
                .format("YYYY-MM-DD HH:mm:ss")
                .toString();

            await User.findOneAndUpdate({
                email: email
            }, {
                resetPasswordToken: plainResetPasswordToken,
                expirationDateResetPasswordToken: expirationDateStr
            });



            res.send({
                result: 'success',
                expirationDate: moment(expirationDate).toDate(),
            });

            await sendEmail(email, 'TView Your reset password code', plainResetPasswordToken);
        } catch (error) {
            res.send({
                result: 'failed',
                message: error
            })
        }
    },

    resetPassword: async (req, res) => {
        try {
            let {
                email,
                resetPasswordToken,
                newPassword
            } = req.body;

            let account = await User.findOne({
                email: email
            });


            if (!account) {
                return res.send({
                    result: 'failed',
                    message: 'Đổi mật khẩu không thành công'
                })
            }

            if (account.resetPasswordToken === resetPasswordToken) {
                await User.findOneAndUpdate({
                    email: email
                }, {
                    resetPasswordToken: null,
                    expirationDateResetPasswordToken: null,
                    password: newPassword,
                })
                return res.send({
                    result: 'success',
                    message: 'Thay đổi mật khẩu thành công'
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

module.exports = authController;
