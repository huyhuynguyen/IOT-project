const axios = require('axios');
const res = require('express/lib/response');

async function getWeatherData(location){
    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=b55b3cb5913446d9ba441315220506&q=${location}&days=1&aqi=no&alerts=no&lang=vi`)
         console.log(response)
    } catch (error) {
        console.error(error);
    }
}
location ="10.806769288786782, 106.74677547430538"
getWeatherData(location)
 