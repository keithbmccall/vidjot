const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const port = process.env.PORT || 7500;
//
const vidjotRouter = require("./controllers/vidjot.js");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  const title = "welcome";
  res.render("index", { title });
});
app.get("/about", (req, res) => {
  const title = "about";
  res.render("about", { title });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

app.use((err, req, res, next) => {
  console.log("Error encountered:", err);
  res.status(500);
  res.send(err);
});
