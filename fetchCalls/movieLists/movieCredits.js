//movie credits
const getMovieCredits = async (id,options) => {
  const respose = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
    options
  );

  console.log("fetching movie credits");
  const data = await respose.json();

  return data;
};


export default getMovieCredits;