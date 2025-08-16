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
import getSearchResults from "./fetchCalls/search/search.js";
import getMediaContent from "./fetchCalls/mediaContent/mediaContent.js";

app.use(
  cors({
    origin: [
      // "http://127.0.0.1:5500",
      // "https://tmdb-project-react.vercel.app",
      "https://my-mdb-lemon.vercel.app",
      "http://localhost:5173",
      `https://sanjeevsmdb.vercel.app`,
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
- media list is working
- mdiea details
- check credits

*/

// ------------------------------------------------------------------------------------------------------//
//endpoint

//media lists
app.get("/media_lists/:media_type/:list_type/:page", async (req, res) => {
  const { media_type, page, list_type } = req.params;
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
app.get("/media_details/:media_type/:id", async (req, res) => {
  const { media_type, id } = req.params;

  // const id = req.params.id;
  // const media_type = req.params.media_type;
  console.log(media_type, id);
  try {
    const data = await getMediaDetails(id, media_type, options);

    if (data.error) {
      return res.status(500).json({ error: "Failed to fetch media details" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error in /media_details route:", error);
    res.status(500).json({ error: "Server error" });
  }
});

//media Credits
app.get("/media_credits/:media_type/:id", async (req, res) => {
  const { media_type, id } = req.params;

  // const id = req.params.id;
  // const media_type = req.params.media_type;
  console.log(media_type, id);
  try {
    const data = await getMediaCredits(id, media_type, options);

    if (data.error) {
      return res.status(500).json({ error: "Failed to fetch media credits" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error in /media_credits route:", error);
    res.status(500).json({ error: "Server error" });
  }
});

//search fucntion
app.get("/search/:query_type/:query/:page", async (req, res) => {
  const { query_type, query, page } = req.params;

  console.log(query_type, query, page);
  try {
    const data = await getSearchResults(options, query_type, query, page);

    if (data.error) {
      return res.status(500).json({ error: "Failed to fetch search result" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error in search route:", error);
    res.status(500).json({ error: "Server error" });
  }
});

//media content like videos
app.get("/media_content/:media_type/:id", async (req, res) => {
  const { media_type, id } = req.params;

  console.log(media_type, id);
  try {
    const data = await getMediaContent(options, id, media_type);

    if (data.error) {
      return res.status(500).json({ error: "Failed to fetch media content" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error in /media_content route:", error);
    res.status(500).json({
      error: `Server error, while getting media_content of ${media_type}`,
    });
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
