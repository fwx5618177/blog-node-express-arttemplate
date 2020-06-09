// import express module.
const express = require('express');

// create home page route.
const home = express.Router();

// route's detail.
home.get('/', (req, res) => {
    res.send('Welcome to the blog\'s home page')
});

// export home's route module
module.exports = home;