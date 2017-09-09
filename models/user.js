var mongoose = require("mongoose");
// var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
   username: String,
   email: String,
   password: String
});

	//image/avatar/prof pic
	//tagline/bio for users
	//email address
	//actual name
	//storing the idea titles to see what they're watching
	//storing the names of the projects they submit (id)
	//storing the ideas they submit (id)

// UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);