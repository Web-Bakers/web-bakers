var mongoose = require("mongoose");
var Idea = require('./models/idea');

var data = [
  {
    title: "Web app to collect project ideas",
    description: "People can share project ideas, for discussion, ranking, and build",
    author: {
      username: "Reuben" },
    createdAt: "Wed Mar 25 2016 07:55:21 GMT-0700 (PDT)",
    display: true

  },
  {
    title: "Goal tracker for FCC",
    description: "I want to be able to see where I'm at in the FCC curriculum, at a glance",
    author: {
      username: "Joe" },
    createdAt: "Wed May 18 2017 07:55:21 GMT-0700 (PDT)",
    display: true
  },
  {
    title: "Healthy meal choices!",
    description: "A tinder-style app that gives recipe suggestions and meal plans, based on preferences and diet",
    author: {
      username: "Reuben" },
    createdAt: "Wed Oct 11 2017 07:55:21 GMT-0700 (PDT)",
    display: true
  },
  {
    title: "Netflix for independent movie makers",
    description: "It's just like Netflix, but indie movie producers can upload their own films",
    author: {
      username: "Gandalf the Grey" },
    createdAt: "Wed Oct 15 2017 07:55:21 GMT-0700 (PDT)",
    display: true
  },
  {
    title: "Hallow Puppy!",
    description: "An app to quickly visualize different halloween costumes on puppies. A little bit like the snapchat",
    author: {
      username: "Rusty" },
    createdAt: "Wed Oct 17 2017 07:55:21 GMT-0700 (PDT)",
    display: true
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