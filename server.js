'use strict';

require('dotenv').config();
const express = require('express');
const pg = require('pg');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const superagent = require('superagent');
const { json } = require('express');

console.log(process.env.DATABASE_URL);
const client = new pg.Client(process.env.DATABASE_URL);

const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const TRAIL_API_KEY = process.env.TRAIL_API_KEY;

app.use(cors());
// app.use(restart());
client.on('error', (error) => {
  console.log(error);
})
app.get('/location', handleLocation);

function handleLocation(req, res) {
  let city = req.query.city;
  let url = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${city}&format=json&limit=1`;

  let SQL = `SELECT * FROM location WHERE search_query = $1`;
  let values = [city];
  client.query(SQL, values)
    .then(dataResult => {
      if (dataResult.rowCount) {
        res.send(dataResult.rows[0]);
        console.log('DB location:', dataResult);
      } else {
        superagent.get(url)
          .then(data => {
            const geoData = data.body[0];
            const location = new Location(city, geoData);
            console.log('Visited location:', location);
            let SQL = 'INSERT INTO location (search_query, formatted_query, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING *';
            let values = [location.search_query, location.formatted_query, location.latitude, location.longitude];

            client.query(SQL, values)
              .then(results => {
                console.log('this is the raw object we will get back:', results.rows);
                res.json(results.rows[0]);
              })
              .catch(error => {
                res.status(500).send(error);
              })
          })
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    })
}

function Location(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData.display_name;
  this.latitude = geoData.lat;
  this.longitude = geoData.lon;
}

app.get('/weather', handleWeather);

function handleWeather(req, res) {
  let lat = req.query.latitude;
  let lon = req.query.longitude;
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}&format=json&days=7`;

  superagent.get(url)
    .then(data => {
      const weatherResults = data.body.data;
      let weatherData = weatherResults.map(day => new Weather(day));
      res.send(weatherData);
    })
    .catch(() => {
      console.error('No weather data available');
    });
}

function Weather(day) {
  this.forecast = day.weather.description;
  this.time = new Date(day.ts * 1000).toDateString();
}

app.get('/trails', handleTrails);

function handleTrails(req, res) {
  let lat = req.query.latitude;
  let lon = req.query.longitude;
  let url = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&key=${TRAIL_API_KEY}`;

  superagent.get(url)
    .then(data => {
      console.log(data.body);
      const trailResults = data.body.trails;
      let trailData = trailResults.map(trails => new Trail(trails));
      res.send(trailData);
    })
    .catch(() => {
      console.error('Are there trails?')
    })
}

function Trail(trails) {
  this.name = trails.name;
  this.location = trails.location;
  this.length = trails.length;
  this.stars = trails.stars;
  this.star_votes = trails.starVotes;
  this.summary = trails.summary;
  this.trail_url = trails.url;
  this.conditions = trails.conditionDetails;
  console.log(trails.conditionDate.split('0'));
  this.condition_date = trails.conditionDate.split(' ')[0];
  this.condition_time = trails.conditionDate.split(' ')[1];
}

app.use('*', (req, res) => {
  res.status(500).send('The page couldn\'t fully load.')
})
client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server up: ${PORT}`);
    });
  })


