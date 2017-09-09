// Initialize packages
var express     = require('express'),
		app         = express(),
		bodyParser  = require('body-parser'),
		mongoose    = require('mongoose'),
		User 				= require('./models/user.js'),
		Idea 				= require('./models/idea.js'),
		Comment 		= require('./models/comment.js'),
		Project 		= require('./models/project.js');


/*added because of new Mongoose requirement. Please reference link below for reasoning.
http://mongoosejs.com/docs/connections.html#use-mongo-client
*/
var promise = mongoose.connect('mongodb://localhost/web_bakers', {
  useMongoClient: true,
});


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// ----------------------------------------------------------
// Test data (until we set up the db)
// -----------------------------
// var ideas = [
//   {
//     title: "Web app to collect project ideas",
//     blurb: "People can share project ideas, for discussion, ranking, and build",
//     author: "Reuben",
//     dateSubmitted: "23 minutes ago",
//   },
//   {
//     title: "Goal tracker for FCC",
//     blurb: "I want to be able to see where I'm at in the FCC curriculum, at a glance",
//     author: "Joe",
//     dateSubmitted: "7 hours ago",
//   },
//   {
//     title: "Healthy meal choices!",
//     blurb: "A tinder-style app that gives recipe suggestions and meal plans, based on preferences and diet",
//     author: "Reuben",
//     dateSubmitted: "Yesterday",
//   },
//   {
//     title: "Netflix for independent movie makers",
//     blurb: "It's just like Netflix, but indie movie producers can upload their own films",
//     author: "Gandalf the Grey",
//     dateSubmitted: "15/5/17",
//   },
//   {
//     title: "Hallow Puppy!",
//     blurb: "An app to quickly visualize different halloween costumes on puppies. A little bit like the snapchat",
//     author: "Rusty",
//     dateSubmitted: "1/12/16",
//   },
// ]


//test db to see if Mongoose is working with Mongo

// Idea.create(
// 	{
// 			title: "Meditation yoga project",
// 			description: "An app where you can find people who like both meditation and yoga."
// 	}, function (err, idea){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			console.log("YOU DID IT! Idea created! :D");
// 			console.log(idea);
// 		}
// 	}
// );

  var tags = ["For Developers", "JavaScript", "Community", "Web App"];

  var comments = [
    {
      author: "Joe P",
      comment: "This sounds amazing!  Let's build!",
      timeStamp: "12/12/16"
    },
    {
      author: "Chance Taken",
      comment: "WOOOO!",
      timeStamp: "2 days ago"
    },
    {
      author: "Penelope Cruz",
      comment: "Hmm, seems boring.",
      timeStamp: "45 minutes ago"
    }
  ];
// ----------------------------------------------------------
// Routes
// -----------------------------

// Homepage (Ideas)
app.get('/', function(req, res) {
  Idea.find({}, function (err, allIdeas) {
    if (err) {
      console.log(err);
    } else {
      res.render('home', {ideas: allIdeas});
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
  var newIdea = { title: title, description: description, author: 'Anonymous', createdAt: myDate};
  Idea.create(newIdea, function (err, newlyCreated) {
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

// Signup Routes
//====================
// Display sign up form
app.get('/register', function(req, res) {
  res.render('register')
});

// Get data from sign up form and add to db
app.post('/register', function (req, res) {
  var userName = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var newUser = { username: userName, email: email, password: password};
  User.create(newUser, function (err, newlyCreated) {
    if (err) {
      // TODO: Add message to user about error
      console.log(err);
    } else {
      // Redirect to main page
      // TODO: add welcome message?
      res.redirect('/');
    }
  });    
});

// Login Routes
//=====================
// Display login form
app.get('/login', function(req, res) {
  res.render('login')
});

// Get data from login form and verify user in db
app.post('/login', function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  User.findOne(email = email, function (err, foundUser) {
    if (err) {
      // TODO: Add message to user about error
      console.log(err);
    } else if (password != foundUser.password) {
      // TODO: Add error message about password mismatch?
      res.render('/login')
    } else if (password == foundUser.password) {
      // Redirect to main page
      // TODO: add welcome message?
      res.redirect('/');
    } else {
      //404
      res.render('catchall');
    }
  });
});

// Show a single idea on a page
app.get('/idea/:id', function(req, res) {
  Idea.findById(req.params.id).populate("comments").exec(function(err, foundIdea){
        if(err){
            console.log(err);
        } else {
            console.log(foundIdea)
            //render show template with that idea
            res.render('ideaDetail', { idea: foundIdea, comments: comments, tags: tags });
        }
    });
});

// Catchall
app.get('*', function(req, res) {
  res.render('catchall');
});

// ----------------------------------------------------------
// App listener
// -----------------------------
app.listen(3000, function() {
  console.log('Server running... what\'s going on in the kitchen?');
});