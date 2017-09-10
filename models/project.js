var mongoose = require("mongoose");

//SCHEMA SETUP
var projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    submittedOn: {type: Date, default: Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    idea: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Idea"
        },
        title: String
    }
    //Add comments to this later...
    //Add projects
    //Updated date
    //image/screenshot submitted with project
    //link to live project
    //link to code
});

module.exports = mongoose.model("Project", projectSchema);