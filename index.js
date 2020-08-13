'use strict'

const express = require("express");
const bodyParser = require("body-parser");

let exphbs = require("express-handlebars");

const app = express();


const data = require('./data.js');
const Person = require('./models/Person.js');

let peopleList = data.getAll();

app.engine('handlebars', exphbs({defaultLayout: false}));
app.set("view engine", "handlebars");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); 
app.use(bodyParser.urlencoded({extended: true})); 

app.use('/api', require('cors')()); // set Access-Control-Allow-Origin header for api route

//----------------------------------

// OLD VERSION (prior to REACT integration)

// send content of 'home' view as HTML response
// app.get('/', (req, res, next) => {
//     return Person.find({}).lean()
//         .then((people) => {
//             res.render('home', {people});
//         })
//         .catch(err => next(err));
// });

//-----------------------------------

// send content of 'home' view as HTML response
app.get('/', (req, res, next) => {
    return Person.find({}).lean()
        .then((items) => {
            res.render('home_react', {items: JSON.stringify(items)});
        })
        .catch(err => next(err));
});

// send content of 'details' view as HTML response
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
});

app.get('/delete', (req, res, next) => {
    var name = req.query.first;
    console.log(name);
    const search_pattern = new RegExp(name, 'i');
    return Person.deleteOne({"first": {$regex : search_pattern} }).lean()
        .then((result) => {
            console.log(result);
            if(result.deletedCount) {
                res.send({"removed":true});
            } else {
                res.send({"removed":false});
            }
        })
        .catch(err => next(err));
});

// API
// Returns JSON data for all docs in the database
app.get('/api/all', (req, res, next) => {
    return Person.find({}).lean()
        .then((people) => {
            res.json(people);
        })
        .catch(err => { 
            return res.status(500).send('Error occurred: database error.')
        });
        // .catch(err => next(err));
});


// API
// Returns JSON data for one object from the database
app.get('/api/details', (req, res, next) => {
    var name = req.query.first;
    console.log(name);
    const search_pattern = new RegExp(name, 'i');
    return Person.findOne({"first": {$regex : search_pattern} }).lean()
        .then((person) => {
            res.json(person);
        })
        .catch(err => { 
            return res.status(500).send('Error occurred: database error.')
        });
});

// API
// Updates a document if it exists in the database, inserts it if it does not.
app.post('/api/add', (req, res) => {
    const newPerson = req.body;
    console.log(newPerson);
    Person.updateOne({'first':newPerson.first}, newPerson, {upsert:true}, (err, result) => {
        if (err) return next(err);
        console.log(result);
        if(result.upserted && result.nModified == 0) {
            res.send({"added":true});
        } else if(result.nModified > 0) {
            res.send({"updated":true});
        } else {
            res.send({"upserted":false});
        }
      });
});

// API
// Deletes a doc from the database, if it exists

// ---------------NOT USING THIS AT THE MOMENT, TRYING TO IMPLEMENT THE METHOD BELOW IT---------------------------

// app.get('/api/delete', (req, res, next) => {
//     var name = req.query.first;
//     console.log(name);
//     const search_pattern = new RegExp(name, 'i');
//     return Person.deleteOne({"first": {$regex : search_pattern} }).lean()
//         .then((result) => {
//             console.log(result);
//             if(result.deletedCount) {
//                 res.send({"removed":true});
//             } else {
//                 res.send({"removed":false});
//             }
//         })
//         .catch(err => { 
//             return res.status(500).send('Error occurred: database error.')
//         });
// });

//API ------------------ new API, attempt to get it to delete from database as per final assignment criterion
// Deletes a doc from the database, if it exists
app.get('/api/delete', (res, req, next) => {
    console.log(req.query);
    Person.deleteOne({"_id":req.query.id}, (err, result) => {
        if(err) return next(err);
        // returns # of items deleted
        console.log(result)
        res.json({"deleted": result})
    })
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
