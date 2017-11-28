// Initialize packages
var express       = require('express'),
  app             = express(),
  bodyParser      = require('body-parser'),
  mongoose        = require('mongoose'),
  flash           = require('connect-flash'),
  passport        = require('passport'),
  LocalStrategy   = require('passport-local'),
  methodOverride  = require('method-override'),
  User            = require('./models/user'),
  Idea            = require('./models/idea'),
  Comment         = require('./models/comment'),
  Project         = require('./models/project'),
  seedDB          = require('./seed');

var ideaRoutes    = require('./routes/ideas'),
    commentRoutes = require('./routes/comments'),
    indexRoutes    = require('./routes/index')
/*added because of new Mongoose requirement. Please reference link below for reasoning.
http://mongoosejs.com/docs/connections.html#use-mongo-client
*/
var promise = mongoose.connect('mongodb://localhost/web_bakers', {
  useMongoClient: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
seedDB();

// PASSPORT CONFIGURATION
app.use(
  require('express-session')({
    secret: 'Chingu ideas are the best ideas!',
    resave: false,
    saveUninitialized: false
  }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

// app.post('/login', function (req, res) {
//   var email = req.body.email;
//   var password = req.body.password;
//   User.findOne(email = email, function (err, foundUser) {
//     if (err) {
//       // TODO: Add message to user about error
//       console.log(err);
//     } else if (password != foundUser.password) {
//       // TODO: Add error message about password mismatch?
//       res.render('/login')
//     } else if (password == foundUser.password) {
//       // Redirect to main page
//       // TODO: add welcome message?
//       res.redirect('/');
//     } else {
//       //404
//       res.render('catchall');
//     }
//   });
// });

app.use(ideaRoutes);
app.use(indexRoutes);
app.use(commentRoutes);

// ----------------------------------------------------------
// App listener
// -----------------------------
app.listen(3000, function() {
  console.log("Server running... what's going on in the kitchen?");
});
