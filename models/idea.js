/*
temporarily commented out.
var mongoose = require("mongoose");

//SCHEMA SETUP
var ideaSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: {type: Date, default: Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
    //Add comments to this later...
    //Add tags 
    //Add projects
    //Updated date
    //Completed date
});

module.exports = mongoose.model("Idea", ideaSchema); */