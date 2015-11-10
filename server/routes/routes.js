//define backend routes here
var utils = require('../config/helpers');
var User = require('../models/model');
var promise = require('bluebird')

module.exports = function(app) {
  app.post('/api/signup', function(req, res) {

    var user = req.body.username;
    var pass = req.body.password;

    User.findOne({ username: user }, function(err, found) {
      if(err) {
        console.error(err);
      }
      if(!found) {
        var newUser = new User({
            username: user,
            password: pass
          });
          // newUser.hashPassword(function (){
            newUser.save(function(err, results) {
              console.log(results)
              console.log('saved')
            });
            // util.createSession(req, res, newUser);
          // });
        
        res.send('OKAY!')
      } else {
        console.log('Account already exists');
        // res.redirect('/signup');
      }
    })


  app.post('/api/signin', function(req, res) {
    console.log(req.body)
    var user = req.body.username;
    var pass = req.body.password;

    User.findOne({ username: user }, function(err, found) {
      if(err) {
        console.error(err);
      }
      if(!found) {
        res.send('Did not find user, please sign up')
      } else {
        res.send('Logging in!')
      }
    })

  })

  app.post('/api/users', function(req, res) {
    console.log('user req', req.body)
    var coordinates = [54,89]
    User.findOneAndUpdate({ username: req.body.username }, 
      {$push: {beenToList: coordinates}}, function(err, doc) {
      if(err) {
        console.error(err)
      }

      console.log('updated the user', doc)
      res.send('updating')
    })
  })

  app.get('/api/users', function(req, res) {

    var findOne = promise.promisify(User.findOne)
    findOne({ username: gambino })
      .then(function(user){
        console.log('list', user.beenToList)
        res.send(user.beenToList)
      });

});

})
};