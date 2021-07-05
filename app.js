const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const indexRouter = require('./routes/index');
const logosRouter = require('./routes/logos/index');
const novelsRouter = require('./routes/novels/index');
const fileUpload = require('express-fileupload');
const app = express();

require("dotenv").config()

app.use(fileUpload({
  limits: { fileSize: 5 * 1024 },
  tempFileDir:'/public/logos/'
}))
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/logos', logosRouter);
app.use('/novels', novelsRouter);

module.exports = app;
