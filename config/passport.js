var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt  = require('passport-jwt').ExtractJwt;
var User = require('../models/users.js').user;
var db = require('../config/main.js');

module.exports = function(passport) {
  var opts = {};

  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey    = db.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload,done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
      if(err) {
        return done(err, false);
      }
      if(user) {
        done(null,user);
      } else {
        done(null, false);
      }
    });
  }));
};
