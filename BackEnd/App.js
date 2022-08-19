const port = 3000;
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./config/db/index');
const route = require('./routes/index');

const app = express();


// connect to database
db.connect();


app.use(cookieParser());
app.use(express.json());

route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})