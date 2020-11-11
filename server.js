'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const superagent = require('superagent');
// const { restart } = require('nodemon');

const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;

app.use(cors());
// app.use(restart());

app.get('/location', handleLocation);

function handleLocation(req, res) {
  let city = req.query.city;
  let url = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${city}&format=json&limit=1`;
  let locations = {};
  if (locations[url]) {
    res.send(locations[url]);
  } else {
    superagent.get(url)
      .then(data => {
        const geoData = data.body[0];
        const location = new Location(city, geoData);
        locations[url] = location;
        console.log('Visited location:', locations);
        res.json(location);
      })
      .catch(() => {
        console.error('Oops!');
      })
  }
}

function Location(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData.display_name;
  this.latitude = geoData.lat;
  this.longitude = geoData.lon;
}

app.get('/weather', handleWeather);

function handleWeather(req, res) {
  try {
    let weatherJson = require('./data/weather.json');
    let weatherArray = weatherJson.data.map(day => new Weather(day));
    res.send(weatherArray);
  } catch (error) {
    console.error(error);
  }
}

function Weather(weatherJson) {
  this.forecast = weatherJson.weather.description;
  this.time = weatherJson.datetime;
}

app.use('*', (req, res) => {
  res.status(500).send('The page couldn\'t fully load.')
})

app.listen(PORT, () => {
  console.log(`server up: ${PORT}`);
});
