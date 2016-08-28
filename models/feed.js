var restful  = require('node-restful');
var mongoose = restful.mongoose;


var Feed = restful.model('feed', mongoose.Schema({
  body: String,
  createdAt: {type: Date, default: new Date()}
},{collection: 'feed'})).methods(['get','post']);

module.exports = Feed;
