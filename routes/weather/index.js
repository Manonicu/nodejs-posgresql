const express = require('express');
const router = express.Router();
const {getWeatherByCity,getWeatherByCoordinates} = require('../../controllers/weather');

router.route('/city').post(getWeatherByCity);
router.route('/coordinates').post(getWeatherByCoordinates);

module.exports = router;
