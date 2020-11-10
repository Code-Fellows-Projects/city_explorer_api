'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/location', handleLocation);

function handleLocation(request, response) {
  try {
    let geoData = require('./data/location.json');

    let city = request.query.city;

    let locationData = new Location(city, geoData);
    response.send(locationData);
  } catch (error) {
    console.error(error);
  }
}

function Location(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData[0].display_name;
  this.latitude = geoData[0].lat;
  this.longitude = geoData[0].lon;
}

app.get('/weather', handleWeather);

function handleWeather(request, response) {
  try {
    let weatherJson = require('./data/weather.json');
    let weatherArray = weatherJson.data.map(day => new Weather(day));
    response.send(weatherArray);
  } catch (error) {
    console.error(error);
  }
}

function Weather(weatherJson) {
  this.forecast = weatherJson.weather.description;
  this.time = weatherJson.datetime;
}

app.use('*', (request, response) => {
  response.status(500).send('The page couldn\'t fully load.')
})

app.listen(PORT, () => {
  console.log(`server up: ${PORT}`);
});
