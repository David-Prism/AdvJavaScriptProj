const mongoose = require("mongoose");

// remote db connection settings. For security, connectionString should be in a separate file not committed to git
const connectionString = "mongodb+srv://david-1:people00110099@scc-projects.dybq3.mongodb.net/scc-projects?retryWrites=true&w=majority";

mongoose.connect(connectionString, { dbName: "scc-projects", useNewUrlParser: true }); 

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define Person model in JSON key/value pairs
// values indicate the data type of each key
const mySchema = mongoose.Schema({
 title: { type: String, required: true },
 first: String,
 last: String,
 age: Number,
 job: String
}); 

module.exports = mongoose.model('Person', mySchema, "people");
