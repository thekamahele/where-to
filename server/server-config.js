var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

module.exports = function(app, express) {
  app.use(express.static(__dirname + '/client'));                 
  app.use('client/lib',  express.static(__dirname + '/client/lib')); 
  app.use(morgan('dev'));                                         
  app.use(bodyParser.json());                                     
  app.use(bodyParser.urlencoded({extended: true}));               
  app.use(bodyParser.text());                                     
  app.use(bodyParser.json({ type: 'application/vnd.api+json'}));  
  app.use(methodOverride());

}