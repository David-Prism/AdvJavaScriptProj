'use strict'

const express = require("express");
const bodyParser = require("body-parser");

var path = require('path');

let exphbs = require("express-handlebars"); // should be at top of module 


// const data = require('/data.js');

const app = express();

// app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: false}));
app.set("view engine", "handlebars");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); 
app.use(bodyParser.urlencoded({extended: true})); 

// send content of 'home' view as HTML response
app.get('/', (req,res) => {
    console.log("asdfyyyyy");
    res.render('home');
});

app.get('/home', (req,res) => {
    console.log("asdfyyyyy");
    res.render('home');
});

// send static file as response
// app.get('/', (req, res) => {
//     res.type('text/html');
//     res.sendFile(__dirname + '/public/home.html'); 
// });
   
// send plain text response
app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('About page asdf');
});

// define 404 handler
app.use( (req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

// Delete this before production--------------------------------
app.listen(app.get('port'), () => {
    console.log('Express started'); 
});
