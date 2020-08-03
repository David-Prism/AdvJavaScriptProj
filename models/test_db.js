const Person = require("./Person");

// return all records
Person.find({}).lean()
  .then((people) => {
    console.log(people);
  })
  .catch(err => next(err));
  
// return all records that match a condition
Person.find({"first": "Peter"}).lean()
  .then((people) => {
    console.log(people);
  })
  .catch(err => next(err));
  