var restful  = require('node-restful');
var mongoose = restful.mongoose;

var bcrypt   = require('bcrypt');


var Users = restful.model('users', mongoose.Schema({
  username: String,
  email: String,
  password: String,
  admin: Boolean
},{collection: 'Users'})).methods(['put','get','post','delete']);


Users.schema.pre('save', function(next) {
  var user = this;
  if(this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function(err,salt) {
      if(err) {
        return next(err);
      }
      bcrypt.hash(user.password,salt, function(err,hash) {
        if(err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// Comparaison
//
// Users.methods.checkingPassword = function(pw,cb) {
//   bcrypt.compare(pw, this.password, function(err, isMatch) {
//     if(err) {
//       return cb(err);
//     }
//     cb(null, isMatch);
//   })
// }

module.exports = {
  user: Users,
  checkingPassword: function(pw,password,cb) {
    bcrypt.compare(pw, password, function(err, isMatch) {
      if(err) {
        return cb(err);
      }
      cb(null, isMatch);
    })
  }
}
