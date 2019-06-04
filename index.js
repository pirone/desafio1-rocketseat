const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "njk");

app.get("/", (req, res) => {
  return res.render("form");
});

app.post("/check", (req, res) => {
  console.log(req.body);
  const idade = req.body.idade;
  if (req.body.idade >= 18) {
    res.redirect(`major?idade=${idade}`);
  } else {
    res.redirect(`minor?idade=${idade}`);
  }
  //return res.render("form");
});

app.get("/major", (req, res) => {
  const idade = req.query.idade;
  return res.render(`major`, { idade });
});

app.get("/minor", (req, res) => {
  const idade = req.query.idade;
  return res.render(`minor`, { idade });
});

app.listen("3000");
