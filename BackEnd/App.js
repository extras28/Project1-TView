const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./config/db/index');
const cors = require('cors');
const authRouter= require('./routes/authRoutes')
const homeRouter= require('./routes/homeRoute')
const userRouter= require('./routes/userRoutes')

const app = express();

const corsOpts = {
  origin: '*',
  methods: [
      'GET',
      'POST',
      'PUT',
      'DELETE'
  ],

  allowedHeaders: [
      'Content-Type',
      'Authorization'
  ],
};

app.use(cors(corsOpts));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// connect to database
db.connect();


app.use(cookieParser());
app.use(express.json());

app.use(userRouter,function (req,res,next) {
  next()
})

app.use(authRouter,function (req,res,next) {
  next()
})

app.use(homeRouter,function (req,res,next) {
  next()
})


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})