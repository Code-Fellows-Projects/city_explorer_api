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

+ JavaScript, node.js, express, NPM
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->

## Change Log

```
Number and name of feature: Feature 1 file tree and repo setup 

Estimate of time needed to complete: 1.5 hr

Start time: 11:30am 

Finish time: 1:30pm

Actual time needed to complete: 2 hours
```
```
Number and name of feature: Feature 2 Adding location response

Estimate of time needed to complete: 1 hour

Start time: 2:30pm

Finish time: 4pm

Actual time needed to complete: 1.5 hours
```
```
Number and name of feature: Feature 3 Adding weather response

Estimate of time needed to complete: 2 hour

Start time: 4pm

Finish time:

Actual time needed to complete: 
```
## Credits and Collaborations

