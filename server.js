'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (request, response) => {
  response.send('cool website');
})

app.listen(PORT, () => {
  console.log(`server up: ${PORT}`);
});
