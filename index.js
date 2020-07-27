'use strict'

const express = require("express");
const bodyParser = require("body-parser");

// var path = require('path');

let exphbs = require("express-handlebars");

const app = express();


const data = require('./data.js');
const Person = require('./models/Person.js');

let peopleList = data.getAll();

// app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: false}));
app.set("view engine", "handlebars");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); 
app.use(bodyParser.urlencoded({extended: true})); 


// app.get('/', (req,res) => {

//     res.render('home', {people: peopleList});
// });


// send content of 'home' view as HTML response
app.get('/', (req, res, next) => {

    return Person.find({}).lean()
        .then((people) => {
            res.render('home', {people});
        })
        .catch(err => next(err));
    // res.render('home', {people: peeps});
});

// app.get('/details', (req, res) => {
//     res.render('details', {first: req.query.first});
// });



//The below doesn't work: -------------------------------------------

// app.get('/details', (req, res, next) => {

//     return Person.find({"first": {req.query.first}}).lean()
//         .then((people), => {
//             res.render('details', {first: req.query.first})
//         })
//         .catch(err => next(err));
// });

app.get('/details', (req, res, next) => {

    var name = req.query.first;
    console.log(name);
    const search_pattern = new RegExp(name, 'i');
    return Person.findOne({"first": {$regex : search_pattern} }).lean()
        .then((person) => {
            console.log(person);
            res.render('details', {person});
        })
        .catch(err => next(err));

    // res.render('details', {person});
});

app.get('/delete', (req, res, next) => {

    var name = req.query.first;
    console.log(name);
    const search_pattern = new RegExp(name, 'i');
    return Person.deleteOne({"first": {$regex : search_pattern} }).lean()
        .then((result) => {
            console.log(result);
            // res.render('details', {person});
            if(result.deletedCount) {
                res.send({"removed":true});
            } else {
                res.send({"removed":false});
            }
        })
        .catch(err => next(err));

    // res.render('details', {person});
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
