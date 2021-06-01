const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path")

router.get('/', function (req, res, next) {
  const logos = fs.readdirSync(path.join(__dirname, '../../public/logos'));
  const data = logos.map(logo => ({ name: logo.split(".")[0], route: `https://apis-kohl.vercel.app/logos/${logo}` }));
  res.json({
    code: 0,
    data
  });
});

module.exports = router;
