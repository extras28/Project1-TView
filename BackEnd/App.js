const port = 8000;
const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./config/db/index');
const route = require('./routes/index');
const cors = require('cors');

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


// connect to database
db.connect();


app.use(cookieParser());
app.use(express.json());

route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})