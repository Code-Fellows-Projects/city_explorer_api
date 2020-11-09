'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


// this is our proof of life
// app.get('/', (request, response) => {
//   response.send('cool website');
// })

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






app.listen(PORT, () => {
  console.log(`server up: ${PORT}`);
});
