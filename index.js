// console.log("hello world is running");
const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
// console.log(portz);

app.get("/", (req, res) => {
  res.send(<h1>This is a Movie Database</h1>);
});

app.get("/movieNames", (req, res) => {
  res.send("we will add movies later!");
});
app.get("/TvNames", (req, res) => {
  res.send("we will add TVs later!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
