//movie credits
const getMovieCredits = async (id, media_type, options) => {
  const respose = await fetch(
    `https://api.themoviedb.org/3/${media_type}/${id}/credits?language=en-US`,
    options
  );

  console.log("fetching movie credits");
  const data = await respose.json();

  return data;
};


export default getMovieCredits;