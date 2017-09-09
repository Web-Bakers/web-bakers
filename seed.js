var mongoose = require("mongoose");
var Idea = require('./models/idea');

var data = [
  {
    title: "Web app to collect project ideas",
    description: "People can share project ideas, for discussion, ranking, and build",
    username: "Reuben",
    dateSubmitted: "23 minutes ago",
  },
  {
    title: "Goal tracker for FCC",
    description: "I want to be able to see where I'm at in the FCC curriculum, at a glance",
    username: "Joe",
    dateSubmitted: "7 hours ago",
  },
  {
    title: "Healthy meal choices!",
    description: "A tinder-style app that gives recipe suggestions and meal plans, based on preferences and diet",
    username: "Reuben",
    dateSubmitted: "Yesterday",
  },
  {
    title: "Netflix for independent movie makers",
    description: "It's just like Netflix, but indie movie producers can upload their own films",
    username: "Gandalf the Grey",
    dateSubmitted: "15/5/17",
  },
  {
    title: "Hallow Puppy!",
    description: "An app to quickly visualize different halloween costumes on puppies. A little bit like the snapchat",
    username: "Rusty",
    dateSubmitted: "1/12/16",
  },
];


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

function seedDB(){
   //Remove all ideas
   Idea.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed ideas!");
         //add a few ideas
        data.forEach(function(seed){
            Idea.create(seed, function(err, idea){
                if(err){
                    console.log(err)
                } else {
                    console.log("added an idea");
                }
            });
        });
    }); 
}

module.exports = seedDB;