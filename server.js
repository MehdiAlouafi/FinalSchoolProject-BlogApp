/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const bodyParser = require('body-parser');
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
const restful = require('node-restful');
const mongoose = restful.mongoose;
const ajax    = require('superagent');
//MongoDb
mongoose.connect('mongodb://admin:admin@ds145325.mlab.com:45325/blog_eval_simplon')

//Express

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Router Api
var Product = restful.model('test', mongoose.Schema({
  title: String,
  year: Number
},{collection: 'blogApp'})).methods(['put','get','post','delete']);
Product.register(app,'/test');
//Get /contact and sending file just to test
app.get('/contact',function(req,res) {
  res.sendFile(path.join(__dirname+"/contact.html"))
});
//express check for any POST request in /contact
//We store the request body in data
//then we invoke ajax (superagent) and post that data
// NOTE: Do not forget to put the EXACT website url as a .post() parameters !
app.post('/contact', function(req, res) {
  var data = req.body;
  ajax
    .post('localhost:3000/test')
    .send(data)
    .end(function(err,res) {
      if(err || !res.ok) {
        console.log('error');
      } else {
        console.log('sucess')
      }
    })

});

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
