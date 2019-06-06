const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});

const checkQueryParam = (req, res, next) => {
  const { idade } = req.query;

  if (!idade) {
    return res.redirect("/");
  }
  return next();
};

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "njk");

app.get("/", (req, res) => {
  return res.render("form");
});

app.post("/check", (req, res) => {
  console.log(req.body);
  const { idade } = req.body;
  if (idade >= 18) {
    res.redirect(`major?idade=${idade}`);
  } else {
    res.redirect(`minor?idade=${idade}`);
  }
});

app.get("/major", checkQueryParam, (req, res) => {
  const { idade } = req.query;
  return res.render(`major`, { idade });
});

app.get("/minor", checkQueryParam, (req, res) => {
  const idade = req.query.idade;
  return res.render(`minor`, { idade });
});

app.listen("3000");
