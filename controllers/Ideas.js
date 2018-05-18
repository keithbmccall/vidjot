const router = require("express").Router();
require("../models/Ideas");
const ideas = require("../models/Ideas");


router.get("/", ideas.queryIdeas, (req, res) => {
  const { ideas } = res.locals;
  res.render("ideas/index", { ideas });
});
router.get("/add", (req, res) => {
  res.render("ideas/add");
});
router.get("/edit/:id", ideas.queryIdea, (req, res) => {
  const { idea } = res.locals;
  res.render("ideas/edit", { idea });
});
//
router.post("/", ideas.createNewIdea, (req, res) => {
  res.redirect("/ideas");
});
//
router.put("/:id", ideas.editIdea, (req, res) => {
  res.redirect("/ideas");
});

router.delete("/:id", ideas.destroy, (req, res) => {
  res.redirect("/ideas");
});
module.exports = router;
