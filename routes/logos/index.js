const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path")
const sharp = require("sharp")
const HOST = process.env.HOST ||"https://apis.manon.icu"

router.get('/', function (req, res, next) {
  const logos = fs.readdirSync(path.join(__dirname, '../../public/logos'));
  const data = logos.map(logo => ({ name: logo.split(".")[0], route: `${HOST}/logos/${logo}` }));
  res.json({
    code: 0,
    data
  });
});

router.post('/', async function (req, res, next) {
  const { filename,filetype } = req.body;
  console.log(filename, filetype)
  if (filetype === 'svg') {
    res.json({ code: 0, data: `${HOST}/logos/${filename}.${filetype}` })
    return;
  }

  const fileBuffer = Buffer.from(fs.readFileSync(path.join(__dirname, `../../public/logos/${filename}.svg`).toString()));
  if (!fileBuffer) {
    res.json({ code:1,data:null})
  }
  if (filetype === 'jpg') {
    sharp(fileBuffer).flatten({background:"#FFFFFF"}).toFile(path.join(__dirname, `../../public/logos/${filename}.${filetype}`), (err, info) => {
      res.json({code:0,data:`${HOST}/logos/${filename}.${filetype}`})
    })
    return;
  }
  sharp(fileBuffer).toFile(path.join(__dirname, `../../public/logos/${filename}.${filetype}`), (err, info) => {
      res.json({code:0,data:`${HOST}/logos/${filename}.${filetype}`})
  })
})

module.exports = router;
