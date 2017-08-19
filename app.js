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
var promise = mongoose.connect('mongodb://localhost/myapp', {
  useMongoClient: true,
});


app.use(express.static('public'));
app.set('view engine', 'ejs');



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

// Homepage
app.get('/', function(req, res) {
  res.render('home');
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