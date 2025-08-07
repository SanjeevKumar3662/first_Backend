const getMediaDetails = async (id, media_type, options) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${media_type}/${id}?language=en-US`,
    options
  );

  console.log("fetchingMovieDetails");
  const data = await response.json();

  return data;
};

export default getMediaDetails;
