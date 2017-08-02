// Initialize packages
var express     = require('express'),
		app         = express(),
		bodyParser  = require('body-parser'),
		mongoose    = require('mongoose');

app.use(express.static('public'));
app.set('view engine', 'ejs');


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



// App listener
app.listen(3000, function() {
  console.log('Server running... what\'s going on in the kitchen?');
});