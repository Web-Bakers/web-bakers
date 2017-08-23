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

var ideas = [
  {
    title: "Web app to collect project ideas",
    blurb: "People can share project ideas, for discussion, ranking, and build",
    author: "Reuben",
    dateSubmitted: "23 minutes ago",
  },
  {
    title: "Goal tracker for FCC",
    blurb: "I want to be able to see where I'm at in the FCC curriculum, at a glance",
    author: "Joe",
    dateSubmitted: "7 hours ago",
  },
  {
    title: "Healthy meal choices!",
    blurb: "A tinder-style app that gives recipe suggestions and meal plans, based on preferences and diet",
    author: "Reuben",
    dateSubmitted: "Yesterday",
  },
  {
    title: "Netflix for independent movie makers",
    blurb: "It's just like Netflix, but indie movie producers can upload their own films",
    author: "Gandalf the Grey",
    dateSubmitted: "15/5/17",
  },
  {
    title: "Hallow Puppy!",
    blurb: "An app to quickly visualize different halloween costumes on puppies. A little bit like the snapchat",
    author: "Rusty",
    dateSubmitted: "1/12/16",
  },
]


//test db to see if Mongoose is working with Mongo
//IDEA SCHEMA
var ideaSchema = new mongoose.Schema({
	title: String,
  description: String,
});

var Idea = mongoose.model("Idea", ideaSchema);

Idea.create(
	{
			title: "Meditation yoga project",
			description: "An app where you can find people who like both meditation and yoga."
	}, function (err, idea){
		if(err){
			console.log(err);
		} else {
			console.log("YOU DID IT! Idea created! :D");
			console.log(idea);
		}
	}
);

// ----------------------------------------------------------
// Routes
// -----------------------------

// Homepage (Ideas)
app.get('/', function(req, res) {
  res.render('home', {ideas: ideas});
});

// Projects
app.get('/projects', function(req, res) {
  res.render('projects');
});

app.post('/ideas', function(req, res) {
  // Get data from form and add to ideas array
  var title = req.body.ideaTitle || 'Test title';
  var description = req.body.ideaDescription || 'Test description';
  var newIdea = { title: title, blurb: description, author: 'Anonymous', dateSubmitted: 'Just Now'};
  ideas.unshift(newIdea);
  // Redirect to ideas page
  res.redirect('/');
});

// Sign up
app.get('/register', function(req, res) {
  res.render('register')
});

// Login
app.get('/login', function(req, res) {
  res.render('login')
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