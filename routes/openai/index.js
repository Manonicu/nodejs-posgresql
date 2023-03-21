const express = require("express");
const router = express.Router();
const { openAIText, openAIImage } = require("../../controllers/openai");

router.route("/text").post(openAIText);
router.route("/image").post(openAIImage);

module.exports = router;
