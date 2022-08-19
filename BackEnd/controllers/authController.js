const User = require('../models/User');
var sha256 = require('js-sha256');
const {
    response
} = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


const authController = {

    refreshTokens: [],

    //REGISTER
    registerUser: async function (req, res) {
        try {
            const hashed = await sha256(req.body.password);
            //create a new user
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            })

            //save to database
            const user = await newUser.save();

            res.status(200).send(user);

        } catch (err) {
            res.status(500).send('cant register');
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
            const user = await User.findOne({
                email: req.body.email
            });
            if (!user) {
                res.status(404).json({
                    success: true,
                    message: "Wrong email",
                });
            }

            const hashed = await sha256(req.body.password);
            const validPassword = hashed === user.password;

            if (!validPassword) {
                res.status(404).json({
                    success: false,
                    message: "Wrong password",
                })
            }

            if (user && validPassword) {

                const accessToken = authController.generatingAccessToken(user);
                const refreshToken = authController.generatingRefreshToken(user);

                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    sameSite: 'strict',
                })

                const {
                    password,
                    ...others
                } = user._doc;

                res.status(200).send({
                    ...others,
                    accessToken,
                });
            }
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
    }
}

module.exports = authController;
