// Initialize packages
var express     = require('express'),
		app         = express(),
		bodyParser  = require('body-parser'),
		mongoose    = require('mongoose');

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

// Catchall
app.get('*', function(req, res) {
  res.render('catchall');
});

// App listener
app.listen(3000, function() {
  console.log('Server running... what\'s going on in the kitchen?');
});