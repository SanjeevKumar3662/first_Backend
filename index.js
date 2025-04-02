// console.log("hello world is running");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
// console.log(portz);

app.use(
  cors({
    origin: ["https://my-mdb-lemon.vercel.app", "http://127.0.0.1:5500"],
    optionsSuccessStatus: 200,
  })
);

//API KEY
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
};

// Popular movies
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
  try {
    const data = await getPopularMovies();

    if (data.error) {
      return res.status(500).json({ error: "Failed to fetch movies" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error in /popularMovies route:", error);
    res.status(500).json({ error: "Server error" });
  }
});

//Popular TV Shows
const getPopularTV = async () => {
  const respose = await fetch(
    "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
    options
  );

  console.log("fetchingPopularTV");
  const data = await respose.json();

  return data;
};

app.get("/popularTV", async (req, res) => {
  try {
    const data = await getPopularTV();

    if (data.error) {
      return res.status(500).json({ error: "Failed to fetch Popular TV" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error in /popularMovies route:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// //Get Movie Details
// const getMovieDetails = async (id) => {
//   const response = await fetch(
//     `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
//     movieID
//   );

//   console.log("fetchingMovieDetails");
//   const data = await response.json();

//   return data;
// };

// app.get("/movieDetails", async (req, res) => {
//   const { id } = req.query;
//   console.log(id);
//   try {
//     const data = await getMovieDetails(id);

//     if (data.error) {
//       return res.status(500).json({ error: "Failed to fetch movie details" });
//     }

//     res.json(data);
//   } catch (error) {
//     console.error("Error in /movieDetails route:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// dummy/test code
app.get("/", (req, res) => {
  res.send("<h1>This is a Movie Database</h1>");
});

app.get("/movieNames", (req, res) => {
  res.send("<h1>we will add movies later!</h1>");
});
app.get("/TvNames", (req, res) => {
  res.send("<h1>we will add TVs later! </h1>");
});

//linstening
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
