const axios = require('axios');
const errorHandle = require('../../utils/errorHandle')
const API_KEY = process.env.OPEN_WEATHER_API_KEY;

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

async function getWeatherByCity(req, res) {
    const {city} = req.body
    try {
        console.log(city,"city")
        const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}`;
        const response = await axios.get(url);
        return res.json(response.data);
    }catch (error) {
        errorHandle(res,error)
    }

}

async function getWeatherByCoordinates(req,res) {
    try {
        const {lat, lon} = req.body
        const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
        const response = await axios.get(url);
        return res.json(response.data);
    }catch (error) {
        errorHandle(res,error)
    }

}

module.exports = {
    getWeatherByCity,
    getWeatherByCoordinates
};
