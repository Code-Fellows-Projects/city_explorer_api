'use strict';

require('dotenv').config();
const express = require('express');
const pg = require('pg');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const superagent = require('superagent');
const { json } = require('express');

const client = new pg.Client(process.env.DATABASE_URL);

const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const TRAIL_API_KEY = process.env.TRAIL_API_KEY;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const YELP_API_KEY = process.env.YELP_API_KEY;

app.use(cors());

client.on('error', (error) => {
  console.log(error);
})

app.get('/location', handleLocation);
app.get('/weather', handleWeather);
app.get('/trails', handleTrails);
app.get('/movies', handleMovies);
app.get('/yelp', handleYelp);
app.use('*', (req, res) => {
  res.status(500).send('The page couldn\'t fully load.')
})

function handleLocation(req, res) {
  let city = req.query.city;
  let url = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${city}&format=json&limit=1`;

  let SQL = `SELECT * FROM location WHERE search_query = $1`;
  let values = [city];
  client.query(SQL, values)
    .then(dataResult => {
      if (dataResult.rowCount) {
        res.send(dataResult.rows[0]);

      } else {
        superagent.get(url)
          .then(data => {
            const geoData = data.body[0];
            const location = new Location(city, geoData);

            let SQL = 'INSERT INTO location (search_query, formatted_query, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING *';
            let values = [location.search_query, location.formatted_query, location.latitude, location.longitude];

            client.query(SQL, values)
              .then(results => {
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
    .catch(error => {
      res.status(500).send('Where is the forecast?', error);
    });
}

function Weather(day) {
  this.forecast = day.weather.description;
  this.time = new Date(day.ts * 1000).toDateString();
}

function handleTrails(req, res) {
  let lat = req.query.latitude;
  let lon = req.query.longitude;
  let url = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&key=${TRAIL_API_KEY}`;

  superagent.get(url)
    .then(data => {
      const trailResults = data.body.trails;
      let trailData = trailResults.map(trails => new Trail(trails));
      res.send(trailData);
    })
    .catch(error => {
      res.status(500).send('Any fun trails around here?', error);
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
  this.condition_date = trails.conditionDate.split(' ')[0];
  this.condition_time = trails.conditionDate.split(' ')[1];
}

function handleMovies(req, res) {
  let city = req.query.search_query;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&language=en-US&query=${city}&page=1&include_adult=false`;

  superagent.get(url)
    .then(data => {
      const currentMovieResults = data.body.results;
      let movieData = currentMovieResults.map(movies => new Movie(movies));
      res.send(movieData);
    })
    .catch(error => {
      res.status(500).send('Where are the movies?', error);
    })
}

function Movie(movies) {
  this.title = movies.title;
  this.overview = movies.overview;
  this.average_votes = movies.vote_average;
  this.total_votes = movies.vote_count;
  this.image_url = `https://image.tmdb.org/t/p/w500/${movies.poster_path}`;
  this.popularity = movies.popularity;
  this.released_on = movies.release_date;
}

function handleYelp(req, res) {
  let lat = req.query.latitude;
  let lon = req.query.longitude;
  let url = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}`

  superagent.get(url)
    .set('Authorization', `Bearer ${YELP_API_KEY}`)
    .then(data => {
      const restaurantResults = data.body.businesses;
      let restaurantData = restaurantResults.map(restaurants => new Restaurant(restaurants));
      res.send(restaurantData);
    })
    .catch(error => {
      res.status(500).send('Are restaurants open?', error);
    })
}

function Restaurant(restaurants) {
  this.name = restaurants.name;
  this.image_url = restaurants.image_url;
  this.price = restaurants.price;
  this.rating = restaurants.rating;
  this.url = restaurants.url;
}


client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server up: ${PORT}`);
    });
  })


