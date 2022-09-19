const jwt = require('jsonwebtoken');

const authMiddleware = {

    //verify token
    verifyToken: (req, res, next) => {
        const token = req.headers.authorization;
        if(token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (err, user) => {
                if(err) {
                    res.status(403).send(err);
                }
                req.user = user;
                next();
            })
        }
        else {
            res.status(401).send('You are not authenticated!!!');
        }
    },

    verifyTokenAndAdminAuth: (req, res, next) => {
        authMiddleware.verifyToken(req, res, ()=>{
            if(req.user._id === req.params._id || req.user.isAdmin === true){
                next();
            } else {
                res.status(403).send('You are not allowed to do this !!!');
            }
        })
    }
}

module.exports = authMiddleware;
