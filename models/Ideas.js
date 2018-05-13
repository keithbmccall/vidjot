require("./index");
const mongoose = require("mongoose");
const Idea = mongoose.model("ideas");

const ideas = {};

ideas.queryIdeas = (req, res, next) => {
  Idea.find({})
    .sort({ date: "desc" })
    .then(ideas => {
      console.log("all of my ideas: ", ideas.map(idea=>idea.title));
      res.locals.ideas = ideas;
      next();
    });
};
ideas.queryIdea = (req, res, next) => {
  Idea.findOne({ _id: req.params.id }).then(idea => {
    res.locals.idea = idea;
    next();
  });
};

ideas.createNewIdea = (req, res, next) => {
  const { title, details } = req.body;
  let errors = [];
  !req.body.title && errors.push({ text: "please add a title" });
  !req.body.details && errors.push({ text: "please add a details" });
  //
  if (errors.length > 1) {
    res.render("ideas/add", { errors, title, details });
  } else {
    const newUser = {
      title,
      details
    };
    new Idea(newUser).save().then(idea => {
      console.log("idea saved!: ", idea);
      next();
    });
  }
};
ideas.editIdea = (req, res, next) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    idea.title = req.body.title;
    idea.details = req.body.details;
    idea.save().then(idea => {
      next();
    });
  });
};
ideas.destroy = (req, res, next) => {
  Idea.remove({
    _id: req.params.id
  }).then(() => {
    req.flash("success_msg", "Video idea removed!");
    next();
  });
};
module.exports = ideas;
