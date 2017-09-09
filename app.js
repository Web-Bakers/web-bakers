// Initialize packages
var express       = require('express'),
  app             = express(),
  bodyParser      = require('body-parser'),
  mongoose        = require('mongoose'),
  passport        = require('passport'),
  LocalStrategy   = require('passport-local'),
  methodOverride  = require('method-override'),
  User            = require('./models/user'),
  Idea            = require('./models/idea'),
  Comment         = require('./models/comment'),
  Project         = require('./models/project'),
  seedDB          = require('./seed');

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
seedDB();

// PASSPORT CONFIGURATION
app.use(
  require('express-session')({
    secret: 'Chingu ideas are the best ideas!',
    resave: false,
    saveUninitialized: false,
  }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// ----------------------------------------------------------
// Routes
// -----------------------------

// Homepage (Ideas)
app.get('/', function(req, res) {
  Idea.find({}, function(err, allIdeas) {
    if (err) {
      console.log(err);
    } else {
      res.render('home', { ideas: allIdeas });
    }
  });
});

// Projects
app.get('/projects', function(req, res) {
  res.render('projects');
});

// Post new idea to main page/add to DB
app.post('/ideas', function(req, res) {
  // Get data from form and add to db
  var title = req.body.ideaTitle;
  var description = req.body.ideaDescription;
  var myDate = Date();
  var newIdea = {
    title: title,
    description: description,
    author: 'Anonymous',
    createdAt: myDate,
  };
  Idea.create(newIdea, function(err, newlyCreated) {
    //error check
    if (err) {
      // TODO: Add message to user about error
      console.log(err);
    } else {
      // Redirect to ideas page
      res.redirect('/');
    }
  });
});

// Show a single idea on a page
app.get('/idea/:id', function(req, res) {
  Idea.findById(req.params.id)
    .populate('comments')
    .exec(function(err, foundIdea) {
      if (err) {
        console.log(err);
      } else {
        console.log(foundIdea);
        //render show template with that idea
        res.render('ideaDetail', {
          idea: foundIdea,
          //comments: comments,
          //tags: tags,
        });
      }
    });
});

// EDIT IDEA ROUTE
app.get('/:id/edit', function(req, res) {
  Idea.findById(req.params.id, function(err, foundIdea) {
    res.render('edit', { idea: foundIdea });
  });
});

// UPDATE IDEA ROUTE
app.put('/:id', function(req, res) {
  // find and update the correct idea
  Idea.findByIdAndUpdate(req.params.id, req.body.idea, function(
    err,
    updatedIdea) {
    if (err) {
      res.redirect('/');
    } else {
      //redirect somewhere(show page)
      res.redirect('/idea/' + req.params.id);
    }
  });
});

// DESTROY IDEA ROUTE
app.delete('/:id', function(req, res) {
  Idea.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect('/');
    } else {
      res.redirect('/');
    }
  });
});

// Signup Routes
//====================
// Display sign up form
app.get('/register', function(req, res) {
  res.render('register');
});

// Get data from sign up form and add to db
app.post('/register', function(req, res) {
  var newUser = new User({
    username: req.body.username,
    email: req.body.email,
  });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, function() {
      console.log('you are ready to bake!');
      res.redirect('/');
    });
  });
});

// Login Routes
//=====================
// Display login form
app.get('/login', function(req, res) {
  res.render('login');
});

// Get data from login form and verify user in db
app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  }),
  function(req, res) {});

// logic route
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

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



// Catchall
app.get('*', function(req, res) {
  res.render('catchall');
});

// ----------------------------------------------------------
// App listener
// -----------------------------
app.listen(3000, function() {
  console.log("Server running... what's going on in the kitchen?");
});
