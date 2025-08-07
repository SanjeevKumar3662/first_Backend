const getMovieDetails = async (id,options) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    options
  );

  console.log("fetchingMovieDetails");
  const data = await response.json();

  return data;
};

export default getMovieDetails;