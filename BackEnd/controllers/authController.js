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



const authController = {

    refreshTokens: [],

    //REGISTER
    registerUser: async function (req, res) {
        try {
            //check user existent
            let checkUser = await User.findOne({
                email: req.body.email
            });

            if (checkUser) {
                return res.status(200).json({
                    success: false,
                    message: 'account already registered',
                })
            }

            const hashed = await sha256(req.body.password);
            //create a new user
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            });

            //save to database
            await newUser.save();

            res.status(200).json(newUser);

        } catch (err) {
            res.status(500).json('cant register');
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
                    expiresIn: "20s"
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
                res.status(404).json({
                    success: true,
                    message: "Wrong email",
                });
            }

            const hashed = await sha256(req.body.password);
            const validPassword = hashed === account.password;

            if (!validPassword) {
                res.status(404).json({
                    success: false,
                    message: "Wrong password",
                })
            }

            // if (user && validPassword) {

            //     const accessToken = authController.generatingAccessToken(user);
            //     const refreshToken = authController.generatingRefreshToken(user);


            //     const {
            //         password,
            //         ...others
            //     } = user._doc;

            //     res.status(200).json({
            //         ...others,
            //         accessToken,
            //     });
            // }


            if (
                !account.accessToken ||
                moment(account.expirationDateToken).diff(moment.now()) <
                0
            ) {
                var accessToken = authController.generatingAccessToken(account);
                var expirationDate = new Date();
                expirationDate = expirationDate.setTime(
                    expirationDate.getTime() + 24 * 3600 * 1000
                ); // 24 hours
                var expirationDateStr = moment(expirationDate)
                    .format("YYYY-MM-DD HH:mm:ss")
                    .toString();
                await account.updateOne({
                    accessToken,
                    expirationDateToken: expirationDateStr,
                });
            }

            res.send({
                result: "success",
                account: account.toJSON(),
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
            res.clearCookie('refreshToken');
            authController.refreshTokens = authController.refreshTokens.filter(token => token !== req.cookies.refreshToken);
            res.status(200).json({
                success: true,
                message: "Log out successfully",
            })
        } catch (err) {
            res.status(500).json({
                success: false,
                message: "Log out unsuccessful",
            })
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
    }
}

module.exports = authController;
