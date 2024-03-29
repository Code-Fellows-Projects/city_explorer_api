# 301-lab-06

+ [Whiteboard - server](whiteboard-server.png)

**Author**: Nathan Cox, Stacy Burris

**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview

+ This application is a platform for learning about setting up servers.

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

+ Spinning up a server

 ```
 'use strict';
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server up: ${PORT}`);
})
```

## Architecture

+ We used JavaScript to create the server and the following libraries, packages and APIs to stand it up:
    + Libraries and packages: Express, node.js, NPM, PG, postgres, cors, dotenv, superagent, and nodemon.
    + APIs: LocationIQ.com, weatherbit.io, hikingproject.com, themoviedb.org, and yelp.com

## Change Log

### Lab 06

```
Number and name of feature: Feature 1: Setup file tree and repo 

Estimate of time needed to complete: 1.5 hr

Start time: 11:30am 

Finish time: 1:30pm

Actual time needed to complete: 2 hours
```

```
Number and name of feature: Feature 2: Add location res

Estimate of time needed to complete: 1 hour

Start time: 2:30pm

Finish time: 4pm

Actual time needed to complete: 1.5 hours
```

```
Number and name of feature: Feature 3: Add weather res

Estimate of time needed to complete: 2 hour

Start time: 4pm

Finish time: 6pm

Actual time needed to complete: 2 hour
```

```
Number and name of feature: Feature 4: Status 500 Error

Estimate of time needed to complete: 15 min

Start time: 5:55 p.m.

Finish time: 6:05 p.m.

Actual time needed to complete: 10 minutes
```

### Lab 07

```
Number and name of feature: Feature 1: refactor weather route to use .map.

Estimate of time needed to complete: 30 min

Start time: 3:05 p.m.

Finish time: 3:20 p.m.

Actual time needed to complete: 15 min
```
```
Number and name of feature: Feature 2: refactor location route with API

Estimate of time needed to complete: 1 hour

Start time: 3:20 pm

Finish time: 4:20 pm

Actual time needed to complete: 1 hour
```
```
Number and name of feature: Feature 3: Refactor weather route with API

Estimate of time needed to complete: 1 hour

Start time: 4:30 p.m.

Finish time:  6:20 p.m.

Actual time needed to complete: 2ish hours 
```
```
Number and name of feature: Feature 4: Add trails route with API

Estimate of time needed to complete: 1 hour

Start time: 6:30 p.m.

Finish time: 7:45 p.m.

Actual time needed to complete: 1.15 hours
```

### Lab 08

```
Number and name of feature: Feature 1: Add database setup and create a table.

Estimate of time needed to complete: 2 hours

Start time: 2:45 p.m.

Finish time: 5:45 p.m. 

Actual time needed to complete: 3 hours
```
```
Number and name of feature: Feature 2: Create a function to check for extant location information before going out to an API for new info.

Estimate of time needed to complete: 1 hour

Start time: 6:20 p.m.

Finish time: 7:40 p.m.

Actual time needed to complete: 1 hour, 20 minutes
```
```
Number and name of feature: Feature 3: Deploy  

Estimate of time needed to complete: 30 mins

Start time: 7:45 p.m.

Finish time: 7:55 p.m.

Actual time needed to complete: 10 mins
```

### Lab 08

```
Number and name of feature: Feature 1: Add a req/res API route for local movies.

Estimate of time needed to complete: 1 hour.

Start time: 3:00 p.m.

Finish time: 4:50 p.m.

Actual time needed to complete: 1 hour and 50 min
```
```
Number and name of feature: Feature 2: Add a req/res API route for yelp restaurants

Estimate of time needed to complete: 1 hour

Start time: 6:05 p.m.

Finish time: 7:00 p.m.

Actual time needed to complete: 55 min
```

## Credits and Collaborators

+ Thank you to our awesome TAs Nicco, Chance, Skyler, Bade, and Ron

+ Websites (API Sources):

+ [Weatherbit](https://www.weatherbit.io/)
+ [LocationIQ](https://locationiq.com/)
+ [Hiking project](https://www.hikingproject.com/data)
+ [The Movie Database](https://www.themoviedb.org/?language=en-US)
+ [Yelp](yelp.com)
