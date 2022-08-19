const authRouter = require('./authRoutes');
const homeRouter = require('./homeRoute.js');
const userRouter = require('./userRoutes');

function route(app){
    app.use('/api/v1', homeRouter);
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/user', userRouter);
}

module.exports = route;