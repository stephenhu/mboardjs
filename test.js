const express = require("express");
const app = express();

const port = 8333;
const host = "localhost";

app.set("views", "./src");
app.set("view engine", "pug");
app.use(express.static("./build"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/media", (req, res) => {
  res.render("media");
});

app.get("/ads", (req, res) => {
  res.render("ads");
});

app.get("/monitor", (req, res) => {
  res.render("monitor");
});

app.get("/settings", (req, res) => {
  res.render("settings");
});

app.get("/gameconfig", (req, res) => {
  res.render("gameconfig");
});

app.get("/control/clock", (req, res) => {
  res.render("control/clock");
});

app.get("/control/score", (req, res) => {
  res.render("control/score");
});

app.get("/scoreboard", (req, res) => {
  res.render("scoreboard");
});

app.get("/notfound", (req, res) => {
  res.render("notfound");
});

app.listen(port, host, () => {
  console.log(`Server started at ${host} port ${port}`);
});