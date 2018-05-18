const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const port = process.env.PORT || 7500;
const passport = require("passport");
const app = express();
const path = require("path");
//
const vidjotRouter = require("./controllers/Ideas.js");
const usersRouter = require("./controllers/Users.js");
// passport
require("./config/passport")(passport);
// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
//
mongoose
  .connect("mongodb://localhost/vidjot-dev")
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch(err =>
    console.log("error at connecting MongoDB with Mongoose: ", err)
  );
//Loading Idea Model
//handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//static folder
app.use(express.static(path.join(__dirname, "public")));
//
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "acid",
    resave: true,
    saveUninitialized: true
  })
);
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//flash alert for success or fail methods
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null
  next();
});
//
app.get("/", (req, res) => {
  const title = "welcome";
  res.render("index", { title });
});
app.get("/about", (req, res) => {
  const title = "about";
  res.render("about", { title });
});
//
app.use("/ideas", vidjotRouter);

// auth
app.use("/users", usersRouter);

//
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

app.use((err, req, res, next) => {
  console.log("Error encountered:", err);
  res.status(500);
  res.send(err);
});
