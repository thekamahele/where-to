var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var port  = process.env.PORT || 3000;
var app = express();

require('./db/db-config')

app.use(express.static(__dirname + '/client'));
app.use('client/lib',  express.static(__dirname + '/client/lib'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(methodOverride());

// Routes
// ------------------------------------------------------
//require('./routes/routes.js')(app);

// Listen
// -------------------------------------------------------
app.listen(port);
console.log('App listening on port ' + port);

module.exports = app;