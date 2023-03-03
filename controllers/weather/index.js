const axios = require('axios');
const errorHandle = require('../../utils/errorHandle')
const API_KEY = process.env.OPEN_WEATHER_API_KEY;
const IP_TOKEN = process.env.IP_INFO_TOKEN;

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

async function getWeatherByCity(req, res) {
    const {city} = req.body
    try {
        const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}`;
        const response = await axios.get(url);
        return res.json(response.data);
    }catch (error) {
        errorHandle(res,error)
    }

}

async function getWeatherByCoordinates(req,res) {
    try {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const locationUrl = `https://ipinfo.io/${ip}?token=${IP_TOKEN}`;
        const locationResponse = await axios.get(locationUrl);
        console.log(locationResponse)
        const { city} = locationResponse.data;

        const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}`;
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
