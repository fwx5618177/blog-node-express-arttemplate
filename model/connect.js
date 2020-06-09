// connect db
// import mongoose
const mongoose = require('mongoose');
const config = require('config');

// connect db
mongoose.connect('mongodb://localhost/blog', {useNewUrlParser: true})
    .then( () => console.log('connect mongodb success.'))
    .catch( () => console.log('Failed to connect the mongodb') )