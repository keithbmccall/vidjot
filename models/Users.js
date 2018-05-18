require("./index");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = mongoose.model("users");

const users = {};

users.createAccount = (req, res, next) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  password !== password2 && errors.push({ text: "Passwords do not match!" });

  password.length < 4 &&
    errors.push({ text: "Password must be at least 4 characters!!" });

  if (errors.length > 0) {
    res.render("users/register", { errors, name, email, password, password2 });
  } else {
    User.findOne({ email }).then(user => {
      if (user) {
        req.flash("error_msg", "Email already exists!");
        res.redirect("/users/register");
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            const hashed = hash;
            const newUser = {
              name,
              email,
              password: hashed
            };

            //   create user function
            new User(newUser)
              .save()
              .then(user => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in!"
                );
                next();
              })
              .catch(err => {
                console.log("register error: ", err);
              });
          });
        });
      }
    });
  }
};
users.login = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/ideas",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
};

module.exports = users;
