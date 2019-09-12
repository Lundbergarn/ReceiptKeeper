const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
let bodyParser = require('body-parser');

const kvittonRouter = require('./routes/kvitton');
const userRouter = require('./routes/user');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '2mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '2mb', extended: true }))

app.use(kvittonRouter);
app.use(userRouter);


const port = process.env.PORT || 3000;



// DB Config
const db = require('./config/keys').MongoURI;

mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database');
  } else {
    console.log('Connected to Mongoose');
  }
});


app.listen(port, () => console.log(`Server started on port ${port}`));
