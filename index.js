// console.log("hello world is running");
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors"
const app = express();
const port = process.env.PORT || 3000;
// console.log(port);

import getPopularMovies from "./fetchCalls/movieLists/popularMovies.js";
import getPopularTV from "./fetchCalls/tvLists/popularTvShows.js";
import getMovieDetails from "./fetchCalls/movieLists/movieDetails.js";
import getTVdetails from "./fetchCalls/tvLists/TvShowsDetails.js";


app.use(
  cors({
    origin: [
      "https://my-mdb-lemon.vercel.app",
      "http://127.0.0.1:5500",
      "http://localhost:5173",
      "https://tmdb-project-react.vercel.app",
    ],
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

//popular movies
app.get("/popular_movies", async (req, res) => {
  const page = req.query.page;
  try {
    const data = await getPopularMovies(page,options);

    if (data.error) {
      return res.status(500).json({ error: "Failed to fetch movies" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error in /popular_movies route:", error);
    res.status(500).json({ error: "Server error" });
  }
});

//Popular TV Shows
app.get("/popular_tv", async (req, res) => {
  const page = req.query.page;
  try {
    const data = await getPopularTV(page,options);

    if (data.error) {
      return res.status(500).json({ error: "Failed to fetch Popular TV" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error in popular_tv route:", error);
    res.status(500).json({ error: "Server error" });
  }
});

//Get Movie Details
app.get("/movie_details/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const data = await getMovieDetails(id,options);

    if (data.error) {
      return res.status(500).json({ error: "Failed to fetch movie details" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error in /movie_details route:", error);
    res.status(500).json({ error: "Server error" });
  }
});

//Get TV Details
app.get("/tv_details/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const data = await getTVdetails(id,options);

    if (data.error) {
      return res.status(500).json({ error: "Failed to fetch TV details" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error in /tv_details route:", error);
    res.status(500).json({ error: "Error in /tv_details route" });
  }
});

// dummy/test code
app.get("/", (req, res) => {
  res.send("<h1>This is a Movie Database</h1>");
});


//linstening
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
