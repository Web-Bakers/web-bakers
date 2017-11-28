var express = require("express");
var router = express.Router();

//HOMEPAGE - show all ideas
router.get('/', function (req, res) {
    Idea.find({ display: true }, function (err, allIdeas) {
        if (err) {
            console.log(err);
        } else {
            res.render('home', { ideas: allIdeas });
        }
    });
});

// Post new idea to main page/add to DB
router.post('/ideas', function (req, res) {
    // Get data from form and add to db
    var title = req.body.ideaTitle;
    var description = req.body.ideaDescription;
    var currentUser = res.locals.currentUser;
    var userInfo;
    var myDate = new Date();

    // Allows for anonymous users to create ideas - until we can validate login and redirect
    if (currentUser) {
        userInfo = {
            id: currentUser.id,
            username: currentUser.username
        }
    } else {
        return res.redirect('/register');
    }

    var newIdea = {
        title: title,
        description: description,
        author: userInfo,
        createdAt: myDate,
    };

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

// Show a single idea on a page
router.get('/idea/:id', function (req, res) {
    Idea.findById(req.params.id)
        .populate('comments')
        .exec(function (err, foundIdea) {
            if (err) {
                console.log(err);
            } else {
                //render show template with that idea
                console.log(foundIdea);
                Idea.find({ display: true }, function (err, allIdeas) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.render('ideaDetail', {
                            idea: foundIdea,
                            ideas: allIdeas,
                            //comments: comments,
                            //tags: tags,
                        });
                    }
                });
            }
        });
});

// EDIT IDEA ROUTE
router.get('/:id/edit', function (req, res) {
    Idea.findById(req.params.id, function (err, foundIdea) {
        Idea.find({ display: true }, function (err, allIdeas) {
            res.render('edit', { idea: foundIdea, ideas: allIdeas });
        });
    });
});

// UPDATE IDEA ROUTE
router.put('/:id', function (req, res) {
    // find and update the correct idea
    Idea.findByIdAndUpdate(req.params.id, req.body.idea, function (
        err,
        updatedIdea) {
        if (err) {
            res.redirect('/');
        } else {
            //redirect somewhere(show page)
            res.redirect('/idea/' + req.params.id);
        }
    });
});

// DESTROY IDEA ROUTE
router.delete('/:id', function (req, res) {
    Idea.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect('/');
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;