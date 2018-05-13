const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const port = process.env.PORT || 7500;
const app = express();
const vidjotRouter = require("./controllers/Ideas.js");

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

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "acid",
    resave: true,
    saveUninitialized: true
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", vidjotRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

app.use((err, req, res, next) => {
  console.log("Error encountered:", err);
  res.status(500);
  res.send(err);
});
