const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("../models/index");
const User = mongoose.model("users");

module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //match user
      User.findOne({ email }).then(user => {
        if (!user) return done(null, false, { message: "No user found!" });
        //match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            console.log("this p: ",user.password)
          if (err) throw err;
          return isMatch
            ? done(null, user)
            : done(null, false, { message: "Password incorrect!" });
        });
      });
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(
      (id,
      (err, user) => {
        done(err, user);
      })
    );
  });
};
 