const router = require("express").Router();
require("../models/Users");
const users = require("../models/Users");
//
router.get("/login", (req, res) => {
  res.render("users/login");
});
router.get("/register", (req, res) => {
  res.render("users/register");
});
router.post("/register", users.createAccount, (req, res) => {
    res.redirect('/users/login')
});
router.post('/login', users.login)
module.exports = router;
