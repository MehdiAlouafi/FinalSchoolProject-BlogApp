/* eslint no-console: 0 */

const path                 = require('path');
const express              = require('express');
const webpack              = require('webpack');
const webpackMiddleware    = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config               = require('./webpack.config.js');
const bodyParser           = require('body-parser');
const isDeveloping         = process.env.NODE_ENV !== 'production';
const port                 = isDeveloping ? 3000 : process.env.PORT;
const app                  = express();
const restful              = require('node-restful');
const mongoose             = restful.mongoose;
const ajax                 = require('superagent');
var ObjectId               = mongoose.Schema.Types.ObjectId;
var morgan                 = require('morgan');
var passport               = require("passport");
var jwt                    = require("jsonwebtoken");
var db                     = require("./config/main.js");
var Users                  = require('./models/users.js').user;
var checkingPassword       = require('./models/users').checkingPassword;
var Feed                   = require('./models/feed');
//Express
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Log requests to console
app.use(morgan('dev'));

// Initialize passport
app.use(passport.initialize());

//MongoDb
mongoose.connect(db.database);

//Bring in passport Strategy
require('./config/passport')(passport);

//Router Api
Users.register(app,'/api/authenticate');
Feed.register(app,'/api/feed');


var blogSchema = restful.model('blog-schema', mongoose.Schema({
  title: String,
  preview: String,
  published: Boolean,
  content: [{tag: String, body: String}],
  comments: [{ body: String, date: Date}],
  createdAt: {type: String}
},{collection: 'blogApp'})).methods(['put','get','post','delete']);

blogSchema.register(app,'/api/articles');

app.post('/addFeed',passport.authenticate('jwt',{session: false}), function(req,res) {
  var content = req.body.body;
  var newFeed = new Feed();
  newFeed.body = content;
  newFeed.save(function(err) {
    if(err) throw err;
    res.sendStatus(200);
  })
})
app.post('/admin/edit/:id', function(req, res) {
  console.log(req.body);
  console.log(req.params.id);

  blogSchema.update(
    {_id: req.params.id, "content._id": req.body.element},
    {$set: {"content.$.body": req.body.newText}},
    function(err, numAffected) {
      console.log(err);
      console.log(numAffected);
    }
  );

});


app.post('/admin/add', passport.authenticate('jwt',{session: false}), function(req, res) {
  if(req.body.isPublished !== undefined) {
  }
  var articleToSave = req.body;
  // Referencing the data we want to push
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  if(dd < 10) {
    dd = '0' + dd
  }
  if(mm < 0) {
    mm = '0' + mm
  }
  today = dd+'/'+mm+'/'+yyyy
  var  content   = articleToSave.content;
  var  title     = articleToSave.title;
  var  published = articleToSave.published;
  var  type      = articleToSave.type;
  // Instantiate a new entry
  var newArticle = new blogSchema();

  newArticle.published = published;
  newArticle.createdAt = today;
  newArticle.title     = title;
  newArticle.content   = [];
  content.map(function(e,i){
    newArticle.content.push({
      tag: e.tag,
      body: e.body
    })
  });

  // Save the entry to the data base

  newArticle.save(function(err){
    if (err) throw err;
    else {
      res.sendStatus(200);
    }
  });


});

app.post('/register', function(req,res) {
  if(!req.body.email || !req.body.password) {
    res.json({success: false, message: 'Please enter an email'})
  } else {
    var newUser = new Users({
      email: req.body.email,
      password: req.body.password
    });
    if(newUser.email === "alouafi.mehdi@gmail.com") {
      newUser.admin = true;
    }
  }
  newUser.save(function(err) {
    if(err) throw err;
    else {
      res.json({success: true, message: 'Successfully created new User'});
    }
  })
});
app.post('/login', function(req,res) {
  Users.findOne({
    email: req.body.email
  }, function(err, user) {
    if(err) throw err;

    if(!user) {
      res.send({success: false, message: 'Authentication Failed, User not found.'});
    } else {
      //Check passwords
      checkingPassword(req.body.password, user.password, function(err, isMatch) {
        if(isMatch && !err) {
          //Create token
          var token = jwt.sign(user,db.secret, {
            expiresIn: 108000
          });
          res.json({success: true, jwtToken: "JWT "+token});
        } else {
          res.json({success: false, message: 'Authentication failed, wrong password buddy'});
        }
      });
    }
  });
});

//Protect Admin Route

// app.get('/admin', passport.authenticate('jwt',{session: false}), function(req,res) {
//   res.send('it worked ' + req.user._id);
// });



//express check for any POST request in /contact
//We store the request body in data
//then we invoke ajax (superagent) and post that data
// NOTE: Do not forget to put the EXACT website url as a .post() parameters !
app.post('/contact', function(req, res) {
  var data = req.body;
  ajax
    .post('localhost:3000/articles')
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
