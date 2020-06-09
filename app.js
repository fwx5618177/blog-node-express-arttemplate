// import express
const express = require('express');
// import dir module
const path = require('path');

// const bodyParser = require('body-parser');
const session = require('express-session');
// create a http server
const app = express();

// connect db
require('./model/connect');
// require('./model/user');
const config = require('config');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(session({secret: 'secret key'}));
// the template location
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');
app.engine('art', require('express-art-template'));

// import route
const home = require('./route/home');
const admin = require('./route/admin');

app.use('/admin', require('./middleware/loginGuard'));

// location
app.use(express.static('public'));
app.use('/home', home);
app.use('/admin', admin);

app.use((err, req, res, next) => {
    const result = JSON.parse(err);

    let params = [];
    for (let attr in result ) {
        if(attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }
    // res.redirect(`${result.path}?message=${result.message}`);
    console.log(config.get('title'))
    res.redirect(`${result.path}?${params.join('&')}`);
});
// Listen the port:8000
app.listen(8000, () => {
    console.log('Server start...port is 8000');
});