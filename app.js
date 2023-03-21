const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();

require("dotenv").config();

app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 },
    tempFileDir: "/public/logos/",
  })
);
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes"));
app.use("/logos", require("./routes/logos"));
app.use("/novels", require("./routes/novels"));
app.use("/openai", require("./routes/openai"));
app.use("/weather", require("./routes/weather"));
app.use("/musik", require("./routes/musik"));

module.exports = app;
