const PORT = 2000;
const MSG = "Hey there, I\'m listening on port: "

var express = require('express');
var app = express();

var path = require('path');

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

app.use('/assets', express.static(path.join(__dirname,'../assets/')));
app.use('/font', express.static(path.join(__dirname,'../assets/font')));

var routes = require('./routes');
app.use('/', routes);

app.listen(PORT, () => {
    console.log(MSG, PORT)
})