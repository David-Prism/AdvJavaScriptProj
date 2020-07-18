'use strict'

const express = require("express");
const bodyParser = require("body-parser");

// var path = require('path');

let exphbs = require("express-handlebars");

const app = express();


const data = require('./data.js');

let peopleList = data.getAll();

// app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: false}));
app.set("view engine", "handlebars");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); 
app.use(bodyParser.urlencoded({extended: true})); 

// send content of 'home' view as HTML response
app.get('/', (req,res) => {

    res.render('home', {people: peopleList});
});

app.get('/details', (req,res) => {

    res.render('details', {first: req.query.first});
});
   
// send plain text response
app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('About page');
});

// define 404 handler
app.use( (req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started'); 
});
