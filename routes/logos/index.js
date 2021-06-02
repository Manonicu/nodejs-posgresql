const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path")
const sharp = require("sharp")
const HOST = process.env.HOST ||"https://apis.manon.icu"

router.get('/', function (req, res, next) {
  const logos = fs.readdirSync(path.join(__dirname, '../../public/logos'));
  const data = logos.filter(logo=>logo.endsWith(".svg")).map(logo => ({ name: logo.split(".")[0], route: `${HOST}/logos/${logo}` }));
  res.json({
    code: 0,
    data
  });
});

router.post('/', async function (req, res, next) {
  const { filename, filetype } = req.body;
  const _buffer = Buffer.from(fs.readFileSync(path.join(__dirname, `../../public/logos/${filename}.svg`)));
  if (filetype === 'svg') {
    res.json({ code: 0, data: _buffer })
    return;
  } else if (filetype === 'jpg') {
    const result = await sharp(_buffer).flatten({background:"#ffffff"}).jpeg({ mozjpeg: true,quality:75 }).toBuffer();
    res.json({ code: 0, data: result })
    return;
  } else if (filetype === 'png') {
    const result = await sharp(_buffer).png({quality:90}).toBuffer();
    res.json({ code: 0, data: result })
    return;
  } else {
    const result = await sharp(_buffer).webp({ lossless: true }).toBuffer();
    res.json({ code: 0, data: result })
    return;
  }


  // if (!fileBuffer) {
  //   res.json({ code:1,data:null})
  // }
  // if (filetype === 'jpg') {
  //   sharp(fileBuffer).flatten({background:"#FFFFFF"}).toFile(path.join(__dirname, `../../public/logos/${filename}.${filetype}`), (err, info) => {
  //     res.json({code:0,data:`${HOST}/logos/${filename}.${filetype}`})
  //   })
  //   return;
  // }
  // const result = await sharp(fileBuffer).png().toBuffer();
  // console.log(result)
  // res.json({code:0,data:result})
  // // sharp(fileBuffer).toBuffer(), (err, info) => {
  // //   console.log(info,"info")
  // //     res.json({code:0,data:`${HOST}/logos/${filename}.${filetype}`})
  // // })
  // // sharp(fileBuffer).toFile(path.join(__dirname, `../../public/logos/${filename}.${filetype}`), (err, info) => {
  // //   console.log(info,"info")
  // //     res.json({code:0,data:`${HOST}/logos/${filename}.${filetype}`})
  // // })
})

module.exports = router;
