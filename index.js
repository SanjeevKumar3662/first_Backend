// console.log("hello world is running");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT;
// console.log(portz);

app.use(
  cors({
    origin: "https://my-mdb-lemon.vercel.app/",
    optionsSuccessStatus: 200,
  })
);

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
};

const getPopularMovies = async () => {
  const respose = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    options
  );

  console.log("fetchingMovies");
  const data = await respose.json();

  return data;
};

app.get("/popularMovies", async (req, res) => {
  const data = await getPopularMovies();
  res.json(data);
});

// old code
app.get("/", (req, res) => {
  res.send("<h1>This is a Movie Database</h1>");
});

app.get("/movieNames", (req, res) => {
  res.send("<h1>we will add movies later!</h1>");
});
app.get("/TvNames", (req, res) => {
  res.send("<h1>we will add TVs later! </h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
