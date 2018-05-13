const router = require("express").Router();
require("../models/Ideas");
const mongoose = require("mongoose");
const Idea = mongoose.model("ideas");
const ideas = require("../models/Ideas");

router.get("/", (req, res) => {
  const title = "welcome";
  res.render("index", { title });
});
router.get("/about", (req, res) => {
  const title = "about";
  res.render("about", { title });
});
router.get("/ideas", ideas.queryIdeas, (req, res) => {
  const { ideas } = res.locals;
  res.render("ideas/index", { ideas });
});
router.get("/ideas/add", (req, res) => {
  res.render("ideas/add");
});
router.get("/ideas/edit/:id", ideas.queryIdea, (req, res) => {
  const { idea } = res.locals;
  res.render("ideas/edit", { idea });
});
//
router.post("/ideas", ideas.createNewIdea, (req, res) => {
  res.redirect("/ideas");
});
//
router.put("/ideas/:id", ideas.editIdea, (req, res) => {
  res.redirect("/ideas");
});

router.delete("/ideas/:id", ideas.destroy, (req, res) => {
  res.redirect("/ideas");
});
module.exports = router;
