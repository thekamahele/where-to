var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var port  = process.env.PORT || 3000;
var app = express();

mongoose.connect("mongodb://localhost/where-to");

app.configure(function() {
  app.use(express.static(__dirname + '/client'));
  app.use('client/lib',  express.static(__dirname + '/client/lib'));
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.text());
  app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
  app.use(methodOverride());
})
// Routes
// ------------------------------------------------------
// require('./app/routes.js')(app);

// Listen
// -------------------------------------------------------
app.listen(port);
console.log('App listening on port ' + port);

module.exports = app;