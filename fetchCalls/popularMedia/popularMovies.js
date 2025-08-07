
// Popular movies
const getPopularMovies = async (page = 12,options) => {
  const respose = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
    options
  );

  console.log("fetchingMovies");
  const data = await respose.json();

  return data;
};


export default getPopularMovies;