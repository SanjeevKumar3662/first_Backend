// console.log("hello world is running");
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
const app = express();
const port = process.env.PORT || 3000;
// console.log(port);

import getMediaLists from "./fetchCalls/movieLists/mediaLists.js";
import getMediaDetails from "./fetchCalls/movieLists/mediaDetails.js";
import getMediaCredits from "./fetchCalls/movieLists/mediaCredits.js";

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

/*
- media -> Movies and Tv Shows


*/

// ------------------------------------------------------------------------------------------------------//
//endpoint

//media lists
app.get("/media_lists/:media_type/:list_type/:page", async (req, res) => {
  const { media_type, page, list_type} = req.params;
  // const page = req.params.page;
  // const media_type = req.params.media_type;
  console.log(media_type, page);
  try {
    const data = await getMediaLists(page, media_type, list_type, options);

    if (data.error) {
      return res.status(500).json({ error: "Failed to fetch movies/tv" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error in /media_lists route:", error);
    res
      .status(500)
      .json({ error: "Server error: Error in /media_lists route" });
  }
});

//media Details
app.get("/movie_details/:media_type/:id", async (req, res) => {
  const { media_type, id } = req.params;

  // const id = req.params.id;
  // const media_type = req.params.media_type;
  console.log(media_type, id);
  try {
    const data = await getMediaDetails(id, media_type, options);

    if (data.error) {
      return res.status(500).json({ error: "Failed to fetch movie details" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error in /movie_details route:", error);
    res.status(500).json({ error: "Server error" });
  }
});

//media Credits
app.get("/movie_tv_credits/:media_type/:id", async (req, res) => {
  const { media_type, id } = req.params;

  // const id = req.params.id;
  // const media_type = req.params.media_type;
  console.log(media_type, id);
  try {
    const data = await getMediaCredits(id, media_type, options);

    if (data.error) {
      return res.status(500).json({ error: "Failed to fetch movie credits" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error in /movie_credits route:", error);
    res.status(500).json({ error: "Server error" });
  }
});

//endpoins
// ------------------------------------------------------------------------------------------------------//

// ------------------------------------------------------------------------------------------------------//
// dummy/test code
app.get("/", (req, res) => {
  res.send("<h1>This is a Movie Database</h1>");
});
// dummy/test code
// ------------------------------------------------------------------------------------------------------//

//linstening
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
