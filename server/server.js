const PORT = 2000;
const MSG = "Hey there, I\'m listening on port: "

// Node.JS framework used in this project
var express = require('express');
var app = express();

// Logger - Useful for debugging
var morgan = require('morgan');
morgan.token('id', function getId (req) {
    return req.id
  });
app.use(morgan(':id :method :url :response-time'));

var path = require('path');

// Nodejs Template Language
var ejs = require('ejs');
app.set('view engine', 'ejs');

// Setting up Database 
var mongoose = require('mongoose');
const DBURL = 'mongodb://localhost:27017/ChiBaKi'
mongoose.connect(DBURL, {
    useNewUrlParser: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
    console.log('DB is connected on: ', DBURL);
})

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Map static files
app.use('/assets', express.static(path.join(__dirname,'../assets/')));
app.use('/font', express.static(path.join(__dirname,'../assets/font')));

// Handle requests in routes.js 
var routes = require('./routes');
app.use('/', routes);

app.listen(PORT, () => {
    console.log(MSG, PORT)
})